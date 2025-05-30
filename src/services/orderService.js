import Cart from "../models/cart.js";
import CartItem from "../models/cartitem.js";
import OrderItem from "../models/orderitem.js";
import Order from "../models/order.js";
import Product from "../models/product.js";
import { ObjectId } from "mongodb";
import { statusOrder } from "../utils/constant.js";
import axios from "axios";
import crypto from 'crypto';

const handleMoMoCallback = async (callbackData) => {
    const resultCode = callbackData.resultCode;
    if (resultCode !== 0) {
        return { success: false, message: "MoMo payment failed or cancelled" };
    }

    const extraDataDecoded = JSON.parse(Buffer.from(callbackData.extraData, 'base64').toString('utf-8'));
    const {
        userId,
        cartItems,
        paymentMethod,
        shipmentMethod,
        orderUser,
        totalAmount,
        totalPrice,
        expectDeliveryDate,
        tax
    } = extraDataDecoded;

    let newOrder = await Order.create({
        userID: userId,
        orderDate: Date.now(),
        paymentMethod,
        shipmentMethod,
        orderUser,
        totalAmount,
        totalPrice,
        expectDeliveryDate,
        tax,
        status: statusOrder.ordered,
        orderItems: []
    });

    let orderItemIds = [];

    for (let item of cartItems) {
        const orderItem = await OrderItem.create({
            product: item.product,
            quantity: item.quantity
        });
        orderItemIds.push(orderItem._id);

        await Product.findByIdAndUpdate(item.product, {
            $inc: { quantity: -item.quantity }
        });

        await CartItem.findByIdAndDelete(item._id);
    }

    await Order.findByIdAndUpdate(newOrder._id, { orderItems: orderItemIds });
    await Cart.findOneAndDelete({ userID: userId });

    return { success: true, message: "Order created successfully", order: newOrder };
};

const accessKey = 'F8BBA842ECF85';
const secretKey = 'K951B6PE1waDMi640xX08PD3vg6EkVlz';
const partnerCode = 'MOMO';
const redirectUrl = 'http://localhost:5173/orderList'; // URL nhận kết quả sau khi thanh toán
const ipnUrl = 'https://new-be-71aa.onrender.com/api/orders/callback';

const createOrder = async (data) => {
    try {
        let cart = await Cart.findOne({ userID: data.userId }).populate("items");
        if (!cart || cart.items.length === 0) {
            return { EC: 404, EM: "Cart is empty or not found", DT: "" };
        }

        // Nếu là MoMo thì KHÔNG tạo đơn ngay mà chuyển hướng đến MoMo
        if (data.paymentMethod.name === 'MoMo') {
            const orderInfo = 'Pay with MoMo';
            const amount = data.totalAmount;
            const orderId = partnerCode + Date.now();
            const requestId = orderId;
            const lang = 'en';

            const tempCartItems = cart.items.map(item => ({
                _id: item._id,
                product: item.product,
                quantity: item.quantity
            }));

            const extraDataObj = {
                userId: data.userId,
                cartItems: tempCartItems,
                paymentMethod: data.paymentMethod,
                shipmentMethod: data.shipmentMethod,
                orderUser: data.orderUser,
                totalAmount: data.totalAmount,
                totalPrice: data.totalPrice,
                expectDeliveryDate: data.expectDeliveryDate,
                tax: data.tax
            };
            const extraData = Buffer.from(JSON.stringify(extraDataObj)).toString('base64');

            const rawSignature = `accessKey=${accessKey}&amount=${amount}&extraData=${extraData}&ipnUrl=${ipnUrl}&orderId=${orderId}&orderInfo=${orderInfo}&partnerCode=${partnerCode}&redirectUrl=${redirectUrl}&requestId=${requestId}&requestType=payWithMethod`;
            const signature = crypto.createHmac('sha256', secretKey).update(rawSignature).digest('hex');

            const requestBody = {
                partnerCode,
                storeId: "MomoTestStore",
                requestId,
                amount,
                orderId,
                orderInfo,
                redirectUrl,
                ipnUrl,
                lang,
                requestType: "payWithMethod",
                autoCapture: true,
                extraData,
                signature
            };

            const momoResponse = await axios({
                method: "POST",
                url: "https://test-payment.momo.vn/v2/gateway/api/create",
                headers: { 'Content-Type': 'application/json' },
                data: requestBody
            });

            return {
                EC: 0,
                EM: "Redirecting to MoMo",
                DT: {
                    payUrl: momoResponse.data.payUrl
                }
            };
        }

        // ===========================
        // Nếu KHÔNG phải MoMo => tạo đơn luôn
        // ===========================

        const tempCartItems = cart.items.map(item => ({
            _id: item._id,
            product: item.product,
            quantity: item.quantity
        }));

        let newOrder = await Order.create({
            userID: data.userId,
            orderDate: Date.now(),
            paymentMethod: data.paymentMethod,
            shipmentMethod: data.shipmentMethod,
            orderUser: data.orderUser,
            totalAmount: data.totalAmount,
            totalPrice: data.totalPrice,
            expectDeliveryDate: data.expectDeliveryDate,
            tax: data.tax,
            status: statusOrder.ordered,
            orderItems: []
        });

        let orderItemIds = [];

        for (let item of tempCartItems) {
            const orderItem = await OrderItem.create({
                product: item.product,
                quantity: item.quantity
            });
            orderItemIds.push(orderItem._id);

            await Product.findByIdAndUpdate(item.product, {
                $inc: { quantity: -item.quantity }
            });

            await CartItem.findByIdAndDelete(item._id);
        }

        await Order.findByIdAndUpdate(newOrder._id, {
            orderItems: orderItemIds
        });

        await Cart.findByIdAndDelete(cart._id);

        return {
            EC: 0,
            EM: "Order created successfully",
            DT: newOrder
        };

    } catch (error) {
        console.error("Error creating Order:", error); // In lỗi đầy đủ
        return {
            EC: 500,
            EM: "Error creating Order",
            DT: error.message
        };
    }
};


// Delete OrderItem
const deleteOrder = async (id) => {
    try {
        let order = await Order.findById(id);
        if (order) {
            for (let i = 0; i < order.orderItems.length; i++) {
                await OrderItem.findByIdAndDelete(order.orderItems[i].toString());
            }
            let deleteOrder = await Order.findByIdAndDelete(order._id.toString());
            if (deleteOrder) {
                return {
                    EC: 0,
                    EM: "Order deleted successfully",
                    DT: ""
                };
            } else {
                return {
                    EC: 500,
                    EM: "Error deleting Order",
                    DT: ""
                };
            }
        } else {
            return {
                EC: 404,
                EM: "Order not found",
                DT: ""
            };
        }
    } catch (error) {
        console.error("Error deleting OrderItem:", error.message);
        return {
            EC: 500,
            EM: "Error deleting OrderItem",
            DT: error.message
        };
    }
};

// Update OrderItem
const updateOrder = async (id, data) => {
    try {
        if (data.status === statusOrder.cancel) {
            let order = await Order.findById(id);
            if (order) {
                for (let i = 0; i < order.orderItems.length; i++) {
                    let orderItem = await OrderItem.findById(new ObjectId(order.orderItems[i].toString()));
                    await Product.findByIdAndUpdate(new ObjectId(orderItem.product.toString()), { $inc: { quantity: +orderItem.quantity } }, { new: true });
                }
            }
        }
        let order = await Order.findByIdAndUpdate(id, { status: data.status }, { new: true });
        if (!order) {
            return {
                EC: 404,
                EM: "OrderItem not found",
                DT: ""
            };
        } else {
            return {
                EC: 0,
                EM: "OrderItem updated successfully",
                DT: order
            };
        }
    } catch (error) {
        console.error("Error updating OrderItem:", error.message);
        return {
            EC: 500,
            EM: "Error updating OrderItem",
            DT: error.message
        };

    }
};

// Get OrderItem (by id or all orderItems)
const getOrder = async (data) => {
    try {
        let order;
        if (data.id) {
            order = await Order.findById(data.id);
            if (order) {
                let orderItems = [];
                for (let i = 0; i < order.orderItems.length; i++) {
                    let orderItem = await OrderItem.findById(order.orderItems[i].toString());
                    let product = await Product.findById(orderItem.product.toString());
                    orderItems.push({ product: product, quantity: orderItem.quantity });
                }

                return {
                    EC: 0,
                    EM: "Get Order successfully",
                    DT: { ...order._doc, orderItems: orderItems }
                }
            } else {
                return {
                    EC: 404,
                    EM: "Order not found",
                    DT: ""
                };
            }
        } else {
            let orders = await Order.find({ userID: data.userID }).skip((data.page - 1) * data.limit).limit(data.limit);
            if (orders) {
                for (let i = 0; i < orders.length; i++) {
                    let orderDetail = [];
                    for (let j = 0; j < orders[i].orderItems.length; j++) {
                        let orderItem = await OrderItem.findById(orders[i].orderItems[j].toString());
                        let product = await Product.findById(orderItem.product.toString());
                        orderDetail.push({ product: product, quantity: orderItem.quantity });
                    }
                    orders[i] = {
                        ...orders[i]._doc,
                        orderDetail: orderDetail
                    }
                }
                return {
                    EC: 0,
                    EM: "Get Order successfully",
                    DT: orders
                };
            } else {
                return {
                    EC: 404,
                    EM: "Order not found",
                    DT: ""
                };
            }

        }
    } catch (error) {
        console.error("Error retrieving OrderItem:", error.message);
        return {
            EC: 500,
            EM: "Error retrieving OrderItem",
            DT: error.message
        };
    }
};

const getAllOrders = async (data) => {
    try {
        let orders;
        const { year, quarter, month, day, status, page = 1, limit = 10 } = data;

        // Ensure that page and limit are valid integers
        const pageNum = Math.max(parseInt(page), 1);  // Default page = 1 if invalid
        const limitNum = Math.max(parseInt(limit), 10);  // Default limit = 10 if invalid

        // Build query filter
        let filter = {};

        // Filter by year (using orderDate)
        if (year) {
            const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
            const endOfYear = new Date(`${parseInt(year) + 1}-01-01T00:00:00.000Z`);
            filter.orderDate = { $gte: startOfYear, $lt: endOfYear };
        }

        // Filter by quarter (using orderDate)
        if (quarter) {
            const validQuarter = parseInt(quarter);
            if (isNaN(validQuarter) || validQuarter < 1 || validQuarter > 4) {
                return {
                    EC: 400,
                    EM: "Invalid quarter",
                    DT: "Quarter must be between 1 and 4"
                };
            }

            let startMonth, endMonth;
            switch (validQuarter) {
                case 1:
                    startMonth = 1;
                    endMonth = 3;
                    break;
                case 2:
                    startMonth = 4;
                    endMonth = 6;
                    break;
                case 3:
                    startMonth = 7;
                    endMonth = 9;
                    break;
                case 4:
                    startMonth = 10;
                    endMonth = 12;
                    break;
            }

            const startOfQuarter = new Date(`${year}-${startMonth.toString().padStart(2, '0')}-01T00:00:00.000Z`);
            let nextQuarterMonth = endMonth + 1;
            let nextYear = year;

            if (nextQuarterMonth === 13) {
                nextQuarterMonth = 1;
                nextYear = parseInt(year) + 1;
            }

            const endOfQuarter = new Date(`${nextYear}-${nextQuarterMonth.toString().padStart(2, '0')}-01T00:00:00.000Z`);

            filter.orderDate = { ...filter.orderDate, $gte: startOfQuarter, $lt: endOfQuarter };
        }

        // Filter by month (using orderDate)
        if (month) {
            const validMonth = parseInt(month);
            if (isNaN(validMonth) || validMonth < 1 || validMonth > 12) {
                return {
                    EC: 400,
                    EM: "Invalid month",
                    DT: "Month must be between 1 and 12"
                };
            }

            const startOfMonth = new Date(`${year}-${validMonth.toString().padStart(2, '0')}-01T00:00:00.000Z`);
            let nextMonth = validMonth + 1;
            let nextYear = year;

            if (nextMonth === 13) {
                nextMonth = 1;
                nextYear = parseInt(year) + 1;
            }

            const endOfMonth = new Date(`${nextYear}-${nextMonth.toString().padStart(2, '0')}-01T00:00:00.000Z`);

            filter.orderDate = { ...filter.orderDate, $gte: startOfMonth, $lt: endOfMonth };
        }

        // Filter by day (using orderDate)
        if (day) {
            const validDay = parseInt(day);
            if (isNaN(validDay) || validDay < 1 || validDay > 31) {
                return {
                    EC: 400,
                    EM: "Invalid day",
                    DT: "Day must be between 1 and 31"
                };
            }

            const validMonth = parseInt(month);
            const date = new Date(year, validMonth - 1, validDay);

            if (date.getDate() !== validDay) {
                return {
                    EC: 400,
                    EM: "Invalid date",
                    DT: `Day ${validDay} does not exist in month ${validMonth}`
                };
            }

            const startOfDay = new Date(date.setHours(0, 0, 0, 0));
            const endOfDay = new Date(date.setHours(23, 59, 59, 999));

            filter.orderDate = { ...filter.orderDate, $gte: startOfDay, $lt: endOfDay };
        }

        // Filter by status (using status field)
        if (status) {
            const validStatus = status.trim().toLowerCase();
            // You can adjust this check based on valid statuses in your database
            const validStatuses = ['cancel', 'shipping', 'waitingship', 'delivered', 'ordered'];
            if (!validStatuses.includes(validStatus)) {
                return {
                    EC: 400,
                    EM: "Invalid status",
                    DT: '',
                };
            }

            filter.status = validStatus;  // Add the status filter to the query
        }

        // Retrieve orders with pagination and applied filters
        orders = await Order.find(filter)
            .sort({ orderDate: -1 })
            .skip((pageNum - 1) * limitNum)  // Pagination: skip records before the current page
            .limit(limitNum)  // Limit the number of orders returned
            .populate({
                path: 'orderItems',
                populate: {
                    path: 'product',
                    model: 'Product'
                }
            });

        // Calculate total number of orders
        const totalOrders = await Order.countDocuments(filter); // Count all documents that match the filter

        // Calculate totalAmount using aggregation
        const totalAmountResult = await Order.aggregate([
            { $match: filter },  // Apply the same filter
            { $group: { _id: null, totalAmount: { $sum: '$totalAmount' } } }
        ]);

        const totalAmount = totalAmountResult.length > 0 ? totalAmountResult[0].totalAmount : 0;

        // Monthly revenue aggregation
        const monthlyRevenueResult = await Order.aggregate([
            { $match: { ...filter, status: 'delivered' } },  // Ensure only "delivered" orders are considered
            {
                $project: {
                    month: { $month: '$orderDate' },  // Extract month from orderDate
                    totalAmount: 1  // Include totalAmount in the projection
                }
            },
            {
                $group: {
                    _id: '$month',
                    revenue: { $sum: '$totalAmount' }
                }
            },
            { $sort: { _id: 1 } }  // Sort by month
        ]);

        // Create an array of revenue for each month (from 1 to 12)
        const monthlyRevenue = Array.from({ length: 12 }, (_, i) => {
            const monthData = monthlyRevenueResult.find(m => m._id === (i + 1));
            return monthData ? monthData.revenue : 0;
        });

        // If orders are found, fetch order details
        if (orders && orders.length > 0) {
            return {
                EC: 0,
                EM: "Get All Orders successfully",
                DT: {
                    orders: orders,
                    totalOrders: totalOrders,
                    totalAmount: totalAmount,  // Return totalAmount from aggregation
                    monthlyRevenue: monthlyRevenue,  // Return the monthly revenue data
                    page: pageNum,  // Return the current page number
                    totalPages: Math.ceil(totalOrders / limitNum)  // Calculate total pages
                }
            };
        } else {
            return {
                EC: 404,
                EM: "Orders not found",
                DT: ""
            };
        }
    } catch (error) {
        console.error("Error retrieving Orders:", error.message);
        return {
            EC: 500,
            EM: "Error retrieving Orders",
            DT: error.message
        };
    }
};


const getTopProduct = async ({ year, month, day }) => {
    try {
        // Xây dựng điều kiện lọc cho orderDate
        let dateFilter = {};

        if (year) {
            // Lọc theo năm
            const startOfYear = new Date(`${year}-01-01T00:00:00.000Z`);
            const endOfYear = new Date(`${parseInt(year) + 1}-01-01T00:00:00.000Z`);
            dateFilter.orderDate = { $gte: startOfYear, $lt: endOfYear };
        }

        // Filter by month (using orderDate)
        if (month) {
            const validMonth = parseInt(month);
            if (isNaN(validMonth) || validMonth < 1 || validMonth > 12) {
                return {
                    EC: 400,
                    EM: "Invalid month",
                    DT: "Month must be between 1 and 12"
                };
            }

            const startOfMonth = new Date(`${year}-${validMonth.toString().padStart(2, '0')}-01T00:00:00.000Z`);
            let nextMonth = validMonth + 1;  // Next month is the next integer month value

            let nextYear = year;  // Default is the same year

            if (nextMonth === 13) {  // Special case for December
                nextMonth = 1;  // Reset to January
                nextYear = parseInt(year) + 1;  // Increment the year
            }

            const endOfMonth = new Date(`${nextYear}-${nextMonth.toString().padStart(2, '0')}-01T00:00:00.000Z`);

            dateFilter.orderDate = { ...dateFilter.orderDate, $gte: startOfMonth, $lt: endOfMonth };
        }


        if (day) {
            // Lọc theo năm, tháng và ngày
            const date = new Date(`${year}-${month}-${day}T00:00:00.000Z`);
            const startOfDay = new Date(date.setHours(0, 0, 0, 0));
            const endOfDay = new Date(date.setHours(23, 59, 59, 999));
            dateFilter.orderDate = { ...dateFilter.orderDate, $gte: startOfDay, $lt: endOfDay };
        }

        // Bắt đầu pipeline aggregation
        const result = await Order.aggregate([
            // Lọc đơn hàng theo orderDate nếu có điều kiện
            { $match: dateFilter },

            // Lấy thông tin các OrderItem và nhóm theo sản phẩm
            { $unwind: "$orderItems" },
            {
                $lookup: {
                    from: "orderitems",  // Bảng OrderItem
                    localField: "orderItems",
                    foreignField: "_id",
                    as: "orderItemDetails",
                }
            },
            { $unwind: "$orderItemDetails" },  // Làm phẳng mảng orderItemDetails

            // Nhóm lại theo sản phẩm và tính tổng số lượng bán ra
            {
                $group: {
                    _id: "$orderItemDetails.product",  // Nhóm theo sản phẩm
                    totalQuantity: { $sum: "$orderItemDetails.quantity" }  // Tính tổng số lượng bán
                }
            },

            // Sắp xếp các sản phẩm theo số lượng bán được (giảm dần)
            { $sort: { totalQuantity: -1 } },

            // Giới hạn kết quả lấy 4 sản phẩm bán chạy nhất
            { $limit: 4 },

            // Lookup để lấy thêm thông tin sản phẩm
            {
                $lookup: {
                    from: "products",  // Bảng Product
                    localField: "_id",  // Trường _id trong nhóm sẽ khớp với product._id
                    foreignField: "_id",
                    as: "productDetails",
                }
            },

            // Làm phẳng mảng productDetails để lấy thông tin chi tiết sản phẩm
            { $unwind: "$productDetails" },

            // Trả về kết quả
            {
                $project: {
                    _id: 0,
                    productId: "$_id",
                    totalQuantity: 1,
                    productName: "$productDetails.name",
                    productPrice: "$productDetails.price",
                    productImage: "$productDetails.image",
                }
            }
        ]);

        return {
            EC: 0,
            EM: "Get Top Products successfully",
            DT: result,
        };

    } catch (error) {
        console.error("Error in getTopProduct:", error.message);
        return {
            EC: 500,
            EM: "Error from server",
            DT: error.message,
        };
    }
};


export { createOrder, deleteOrder, updateOrder, getOrder, getAllOrders, getTopProduct, handleMoMoCallback };
