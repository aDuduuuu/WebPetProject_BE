import { createOrder, updateOrder, deleteOrder, getOrder, getAllOrders, getTopProduct, handleMoMoCallback } from "../services/orderService.js";

const momoCallback = async (req, res) => {
    console.log("🔥 Callback received from MoMo:");
    console.log(req.body); // xem có dữ liệu không

    try {
        const result = await handleMoMoCallback(req.body);
        if (result.success) {
            return res.status(200).json({ message: result.message, order: result.order });
        } else {
            return res.status(200).json({ message: result.message });
        }
    } catch (error) {
        console.error("❌ Callback Error:", error.message);
        return res.status(500).json({ message: "Callback handling failed", error: error.message });
    }
};


// Create Order
const ccreateOrder = async (req, res) => {
    try {
        let data = req.body;
        if (!data || !data.totalPrice || !data.paymentMethod || !data.shipmentMethod || !data.orderUser || !data.totalPrice || !data.tax || !data.totalAmount || !data.expectDeliveryDate) {
            return res.status(200).json({
                EC: 400,
                EM: "Invalid input",
                DT: ""
            });
        }
        let response = await createOrder({ ...data, userId: req.user.id });
        return res.status(200).json({
            EC: response.EC,
            EM: response.EM,
            DT: response.DT
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 500,
            EM: "Error from server",
            DT: ""
        });
    }
};


// Update Order
const cupdateOrder = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;

        if (!id || !data) {
            return res.status(200).json({
                EC: 400,
                EM: "Invalid input",
                DT: ""
            });
        }
        let response = await updateOrder(id, data);
        return res.status(200).json({
            EC: response.EC,
            EM: response.EM,
            DT: response.DT
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 500,
            EM: "Error from server",
            DT: ""
        });
    }
};


// Delete Order
const cdeleteOrder = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(200).json({
                EC: 400,
                EM: "Order ID is required",
                DT: ""
            });
        }

        let response = await deleteOrder(id, req.user.id);
        return res.status(200).json({
            EC: response.EC,
            EM: response.EM,
            DT: response.DT
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 500,
            EM: "Error from server",
            DT: ""
        });
    }
};

// Get Order (by id or all orders with pagination)
const cgetOrder = async (req, res) => {
    try {
        let id = req.params?.id || null;
        let page = parseInt(req?.query?.page) || 1;
        let limit = parseInt(req?.query?.limit) || 20;
        let response = await getOrder({ id, userID: req.user.id, page, limit });
        return res.status(response.EC === 0 ? 200 : 400).json({
            EC: response.EC,
            EM: response.EM,
            DT: response.DT
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            EC: 500,
            EM: "Error from server",
            DT: ""
        });
    }
};

const cgetTopProduct = async (req, res) => {
    try {
        // Lấy các tham số year, month, day từ query string
        const { year, month, day } = req.query;

        // Kiểm tra xem tham số năm, tháng, ngày có hợp lệ không
        if (year && isNaN(year)) {
            return res.status(400).json({
                EC: 1,
                EM: "Year must be a valid number",
                DT: null
            });
        }

        if (month && (isNaN(month) || month < 1 || month > 12)) {
            return res.status(400).json({
                EC: 1,
                EM: "Month must be a valid number between 1 and 12",
                DT: null
            });
        }

        if (day && (isNaN(day) || day < 1 || day > 31)) {
            return res.status(400).json({
                EC: 1,
                EM: "Day must be a valid number between 1 and 31",
                DT: null
            });
        }

        // Gọi hàm getTopProduct với các tham số lọc (nếu có)
        let response = await getTopProduct({
            year: year ? parseInt(year) : undefined,  // Nếu có year thì chuyển thành số
            month: month ? month.padStart(2, '0') : undefined,  // Đảm bảo month là 2 chữ số
            day: day ? day.padStart(2, '0') : undefined,  // Đảm bảo day là 2 chữ số
        });

        // Trả về kết quả cho client
        return res.status(response.EC === 0 ? 200 : 400).json({
            EC: response.EC,
            EM: response.EM,
            DT: response.DT
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            EC: 500,
            EM: "Error from server",
            DT: ""
        });
    }
};


const cgetAllOrders = async (req, res) => {
    try {
        let { page = 1, limit = 20, year, quarter, month, day, status } = req.query;

        // Convert page and limit to integers
        page = parseInt(page);
        limit = parseInt(limit);

        // Call the service function with the proper filters
        let response = await getAllOrders({ year, quarter, month, day, page, limit, status });

        return res.status(response.EC === 0 ? 200 : 400).json({
            EC: response.EC,
            EM: response.EM,
            DT: response.DT // Trả về cả orders và tổng số đơn hàng
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            EC: 500,
            EM: "Error from server",
            DT: ""
        });
    }
};



export { ccreateOrder as createOrder, cupdateOrder as updateOrder, cdeleteOrder as deleteOrder, cgetOrder as getOrder, cgetAllOrders as getAllOrders, cgetTopProduct as getTopProduct, momoCallback };
