import { createOrder, updateOrder, deleteOrder, getOrder } from "../services/orderService.js";

// Create Order
const ccreateOrder = async (req, res) => {
    try {
        let data = req.body;
        if (!data || !data.totalPrice || !data.paymentMethod || !data.shipmentMethod || !data.orderUser || !data.totalPrice || !data.tax) {
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
        return res.status(response.EC === 200 ? 200 : 400).json({
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

export { ccreateOrder as createOrder, cupdateOrder as updateOrder, cdeleteOrder as deleteOrder, cgetOrder as getOrder };
