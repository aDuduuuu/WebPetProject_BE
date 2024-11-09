import { createCartItem, updateCartItem, deleteCartItem, getCartItem } from "../services/cartItemService.js";

// Create CartItem
const ccreateCartItem = async (req, res) => {
    try {
        let data = req.body;
        if (!data || !data.product || !data.quantity) {
            return res.status(200).json({
                EC: 400,
                EM: "Input is empty",
                DT: ""
            });
        }
        if (data.quantity <= 0) {
            return res.status(200).json({
                EC: 400,
                EM: "Quantity must be greater than 0",
                DT: ""
            });
        }
        let response = await createCartItem({ ...data, userID: req.user.id });
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

// Update CartItem
const cupdateCartItem = async (req, res) => {
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
        if (data?.quantity <= 0) {
            return res.status(200).json({
                EC: 400,
                EM: "Quantity must be greater than 0",
                DT: ""
            });
        }
        let response = await updateCartItem(id, data);
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


// Delete CartItem
const cdeleteCartItem = async (req, res) => {
    try {
        let id = req.params.id;
        if (!id) {
            return res.status(200).json({
                EC: 400,
                EM: "CartItem ID is required",
                DT: ""
            });
        }

        let response = await deleteCartItem(id);
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

// Get CartItem (by id or all cartItems with pagination)
const cgetCartItem = async (req, res) => {
    try {
        let id = req.params?.id || null;
        let page = parseInt(req?.query?.page) || 1;
        let limit = parseInt(req?.query?.limit) || 20;
        let response = await getCartItem({ id, userID: req.user.id, page, limit });
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

export { ccreateCartItem as createCartItem, cupdateCartItem as updateCartItem, cdeleteCartItem as deleteCartItem, cgetCartItem as getCartItem };
