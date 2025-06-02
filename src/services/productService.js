import Product from "../models/product.js";

// Create Product
const createProduct = async (data) => {
    try {
        console.log(data);

        // Đảm bảo luôn set status là "active" khi tạo
        const productData = {
            ...data,
            status: "active"
        };

        let product = await Product.create(productData);
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
            // Update status to inactive by productCode
            product = await Product.findOneAndUpdate(
                { productCode: id },
                { status: "inactive" },
                { new: true }
            );
        } else {
            // Update status to inactive by MongoDB _id
            product = await Product.findByIdAndUpdate(
                id,
                { status: "inactive" },
                { new: true }
            );
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
            EM: "Product marked as inactive successfully",
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
        let query = { status: "active" }; // ✅ Chỉ lấy sản phẩm active

        // Nếu có id hoặc useProductCode, lấy sản phẩm cụ thể
        if (id) {
            const findQuery = useProductCode
                ? { productCode: id, status: "active" }
                : { _id: id, status: "active" };

            const product = await Product.findOne(findQuery);

            if (!product) {
                return { EC: 404, EM: "Product not found", DT: "" };
            }

            return { EC: 200, EM: "Product retrieved successfully", DT: product };
        }

        // Áp dụng filter
        if (filters.Type) {
            query.productType = filters.Type;
        }

        if (filters.minPrice || filters.maxPrice) {
            query.price = {};
            if (filters.minPrice) query.price.$gte = filters.minPrice;
            if (filters.maxPrice) query.price.$lte = filters.maxPrice;
        }

        // Pagination và sorting
        limit = parseInt(limit) || 20;
        page = parseInt(page) || 1;
        const skip = (page - 1) * limit;

        let sortOption = {};
        if (sortBy === 'time') sortOption.createdAt = -1;
        if (sortBy === 'otime') sortOption.createdAt = 1;
        if (sortBy === 'dprice') sortOption.price = -1;
        if (sortBy === 'aprice') sortOption.price = 1;

        const totalProducts = await Product.countDocuments(query);
        const products = await Product.find(query).limit(limit).skip(skip).sort(sortOption);

        return {
            EC: 200,
            EM: products.length ? "Products retrieved successfully" : "No products found",
            DT: products,
            totalProducts,
        };
    } catch (error) {
        console.error("Error retrieving products:", error);
        return { EC: 500, EM: "Error from server", DT: error.message };
    }
};


// Search Product by name (case-insensitive, paginated)
const searchProductByName = async (keyword, page = 1, limit = 10) => {
    try {
        const regex = new RegExp(keyword, "i"); // Case-insensitive search
        const skip = (page - 1) * limit;

        const query = { name: regex, status: "active" }; // ✅ chỉ lấy product active

        const totalProducts = await Product.countDocuments(query);

        const products = await Product.find(query)
            .limit(limit)
            .skip(skip)
            .select("name image price productType quantity description");

        return {
            EC: 200,
            EM: products.length ? "Product(s) found by name" : "No product matched the name",
            DT: products,
            totalProducts,
        };
    } catch (error) {
        console.error("Error searching product by name:", error.message);
        return {
            EC: 500,
            EM: "Error searching product",
            DT: error.message,
        };
    }
};


export { createProduct, deleteProduct, updateProduct, getProduct, searchProductByName };
