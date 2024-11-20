import Cart from "../models/cart.js";
import CartItem from "../models/cartitem.js";
import OrderItem from "../models/orderitem.js";
import Order from "../models/order.js";
import Product from "../models/product.js";

// Create OrderItem
const createOrder = async (data) => {
    try {
        let card = await Cart.findOne({ userID: data.userId });
        if (!card) {
            return {
                EC: 404,
                EM: "Cart not found",
                DT: ""
            };
        } else {
            let arrItem = [];
            for (let i = 0; i < card.items.length; i++) {
                let cartItem = await CartItem.findById(card.items[i].toString());
                if (cartItem) {
                    let deleteCartItem = await CartItem.findByIdAndDelete(cartItem._id.toString());
                    console.log("chekc deleteCartItem", deleteCartItem);
                    if (deleteCartItem) {
                        let product = await Product.findOneAndUpdate(cartItem.product, { $inc: { quantity: -cartItem.quantity } }, { new: true });
                        if (product) {
                            let orderItem = await OrderItem.create({ product: cartItem.product, quantity: cartItem.quantity });
                            console.log("check orderItem", orderItem);
                            arrItem.push(orderItem._id.toString());
                        } else {
                            return {
                                EC: 500,
                                EM: "Error updating Product",
                                DT: ""
                            };
                        }
                    } else {
                        return {
                            EC: 500,
                            EM: "Error deleting CartItem",
                            DT: ""
                        };
                    }
                } else {
                    return {
                        EC: 404,
                        EM: "CartItem not found",
                        DT: ""
                    };
                }
            }
            let order = await Order.create({
                userID: data.userId,
                orderDate: Date.now(),
                paymentMethod: data.paymentMethod,
                shipmentMethod: data.shipmentMethod,
                orderUser: data.orderUser,
                totalAmount: data.totalPrice,
                tax: data.tax,
                status: "Pending",
                orderItems: arrItem
            });
            if (order) {
                await Cart.findByIdAndUpdate(card._id, { items: [] }, { new: true });
                return {
                    EC: 0,
                    EM: "Order created successfully",
                    DT: order
                };
            } else {
                return {
                    EC: 500,
                    EM: "Error creating Order",
                    DT: ""
                };
            }
        }
    } catch (error) {
        console.error("Error creating OrderItem:", error.message);
        return {
            EC: 500,
            EM: "Error creating OrderItem",
            DT: error.message // Trả về chi tiết lỗi để dễ dàng debug
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
        if (data.status === "Cancelled") {
            let order = await Order.findById(id);
            if (order) {
                for (let i = 0; i < order.orderItems.length; i++) {
                    let orderItem = await OrderItem.findById(order.orderItems[i].toString());
                    await Product.findByIdAndUpdate(orderItem.product, { $inc: { quantity: orderItem.quantity } }, { new: true });
                }
            }
        }
        let order = await Order.findByIdAndUpdate(id, data, { new: true });
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

export { createOrder, deleteOrder, updateOrder, getOrder };
