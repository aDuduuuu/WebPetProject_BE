import { createProduct, deleteProduct, updateProduct, getProduct } from "../services/productService.js";

// Create Product
const ccreateProduct = async (req, res) => {
    try {
        let data = req.body;
        if (!data || !data.name || !data.productCode || !data.productType || !data.price || !data.quantity) {
            return res.status(200).json({
                EC: 400,
                EM: "Input is empty or incomplete",
                DT: ""
            });
        }
        let response = await createProduct(data);
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

// Update Product
const cupdateProduct = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let useProductCode = req.query.useProductCode === "true"; // Check if we want to update by productCode

        if (!id || !data) {
            return res.status(200).json({
                EC: 400,
                EM: "Invalid input",
                DT: ""
            });
        }

        let response = await updateProduct(id, data, useProductCode);
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

// Delete Product
const cdeleteProduct = async (req, res) => {
    try {
        let id = req.params.id;
        let useProductCode = req.query.useProductCode === "true"; // Check if we want to delete by productCode
        if (!id) {
            return res.status(200).json({
                EC: 400,
                EM: "Product ID or Code is required",
                DT: ""
            });
        }

        let response = await deleteProduct(id, useProductCode);
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

// Get Product (by id, productCode, or all products with pagination)
const cgetProduct = async (req, res) => {
    try {
        let id = req.params.id;
        let useProductCode = req.query.useProductCode === "true"; // Kiểm tra nếu muốn tìm kiếm theo productCode
        let limit = req.query.limit || 20; // Số lượng sản phẩm mỗi trang
        let page = req.query.page || 1; // Trang cần lấy

        let response = await getProduct(id, useProductCode, page, limit);
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

export { ccreateProduct as createProduct, cupdateProduct as updateProduct, cdeleteProduct as deleteProduct, cgetProduct as getProduct};
