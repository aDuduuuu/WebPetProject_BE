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

const getProduct = async (id, useProductCode = false, page = 1, limit = 20, filters = {}, sortBy = '') => {
    try {
        let query = {};

        // Nếu có id hoặc useProductCode, lấy sản phẩm cụ thể
        if (id) {
            if (useProductCode) {
                const product = await Product.findOne({ productCode: id });
                if (!product) {
                    return { EC: 404, EM: "Product not found", DT: "" };
                }
                return { EC: 200, EM: "Product retrieved successfully", DT: product };
            } else {
                const product = await Product.findById(id);
                if (!product) {
                    return { EC: 404, EM: "Product not found", DT: "" };
                }
                return { EC: 200, EM: "Product retrieved successfully", DT: product };
            }
        }

        // Nếu không có id, áp dụng bộ lọc và sắp xếp cho danh sách sản phẩm
        if (filters.Type) {
            query.productType = filters.Type;
        }

        if (filters.minPrice || filters.maxPrice) {
            query.price = {};
            if (filters.minPrice) query.price.$gte = filters.minPrice;
            if (filters.maxPrice) query.price.$lte = filters.maxPrice;
        }

        limit = parseInt(limit) || 20;
        page = parseInt(page) || 1;
        let skip = (page - 1) * limit;

        let sortOption = {};
        if (sortBy === 'time') sortOption.createdAt = -1;
        if (sortBy === 'otime') sortOption.createdAt = 1;
        if (sortBy === 'dprice') sortOption.price = -1;
        if (sortBy === 'aprice') sortOption.price = 1;

        const products = await Product.find(query).limit(limit).skip(skip).sort(sortOption);

        if (!products || products.length === 0) {
            return { EC: 404, EM: "No products found", DT: [] };
        }

        return { EC: 200, EM: "Products retrieved successfully", DT: products };
    } catch (error) {
        console.error("Error retrieving products:", error);
        return { EC: 500, EM: "Error from server", DT: "" };
    }
};

export { createProduct, deleteProduct, updateProduct, getProduct};
