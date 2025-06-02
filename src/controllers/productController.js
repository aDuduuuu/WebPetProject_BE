import { createProduct, deleteProduct, updateProduct, getProduct, searchProductByName, } from "../services/productService.js";

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
        let useProductCode = req.query.useProductCode === "true"; // Check if we want to update by productCode
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
        let useProductCode = req.query.useProductCode === "true";
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 20;

        const filters = {
            Type: req.query.Type,
            minPrice: req.query.minPrice ? parseFloat(req.query.minPrice) : undefined,
            maxPrice: req.query.maxPrice ? parseFloat(req.query.maxPrice) : undefined,
        };

        const sortBy = req.query.sortBy || '';

        const response = await getProduct(id, useProductCode, page, limit, filters, sortBy);

        return res.status(response.EC === 200 ? 200 : 404).json({
            EC: response.EC,
            EM: response.EM,
            DT: response.DT,
            totalProducts: response.totalProducts || 0,
        });
    } catch (error) {
        console.log("Error in cgetProduct:", error);
        return res.status(500).json({
            EC: 500,
            EM: "Error from server",
            DT: "",
        });
    }
};

// Search Product by name (paginated)
const csearchProductByName = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;

        const response = await searchProductByName(keyword, page, limit);
        return res.status(response.EC === 200 ? 200 : 400).json({
            EC: response.EC,
            EM: response.EM,
            DT: response.DT,
            totalProducts: response.totalProducts || 0,
        });
    } catch (error) {
        console.error("Error searching product by name:", error.message);
        return res.status(500).json({
            EC: 500,
            EM: "Internal Server Error: " + error.message,
            DT: "",
        });
    }
};


export { ccreateProduct as createProduct, cupdateProduct as updateProduct, cdeleteProduct as deleteProduct, cgetProduct as getProduct, csearchProductByName as searchProductByName };
