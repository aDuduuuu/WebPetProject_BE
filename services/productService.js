import Product from "../models/product.js";

// Create Product
const createProduct = async (data) => {
    try {
        console.log(data);
        let product = await Product.create(data);
        return {
            EC: 200,
            EM: "Product created successfully",
            DT: product
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 500,
            EM: "Error from server",
            DT: ""
        };
    }
};

// Delete Product
const deleteProduct = async (id, useProductCode = false) => {
    try {
        let product;
        if (useProductCode) {
            // Delete product by productCode
            product = await Product.findOneAndDelete({ productCode: id });
        } else {
            // Delete product by MongoDB _id
            product = await Product.findByIdAndDelete(id);
        }

        if (!product) {
            return {
                EC: 404,
                EM: "Product not found",
                DT: ""
            };
        }

        return {
            EC: 200,
            EM: "Product deleted successfully",
            DT: product
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 500,
            EM: "Error from server",
            DT: ""
        };
    }
};

// Update Product
const updateProduct = async (id, data, useProductCode = false) => {
    try {
        let product;
        if (useProductCode) {
            // Update product by productCode
            product = await Product.findOneAndUpdate({ productCode: id }, data, { new: true });
        } else {
            // Update product by MongoDB _id
            product = await Product.findByIdAndUpdate(id, data, { new: true });
        }

        if (!product) {
            return {
                EC: 404,
                EM: "Product not found",
                DT: ""
            };
        }

        return {
            EC: 200,
            EM: "Product updated successfully",
            DT: product
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 500,
            EM: "Error from server",
            DT: ""
        };
    }
};

// Get Product (by id or all products)
const getProduct = async (id, useProductCode = false) => {
    try {
        let product;
        if (useProductCode) {
            // Find product by productCode
            product = await Product.findOne({ productCode: id });
        } else if (id) {
            // Find product by MongoDB _id
            product = await Product.findById(id);
        } else {
            // Get all products
            product = await Product.find();
        }

        if (!product) {
            return {
                EC: 404,
                EM: "Product not found",
                DT: ""
            };
        }

        return {
            EC: 200,
            EM: "Success",
            DT: product
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 500,
            EM: "Error from server",
            DT: ""
        };
    }
};

export { createProduct, deleteProduct, updateProduct, getProduct };
