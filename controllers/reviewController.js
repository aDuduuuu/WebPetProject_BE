import { createReview, updateReview, deleteReview, getReview } from "../services/reviewService.js";

// Create Review
const ccreateReview = async (req, res) => {
    try {
        let data = req.body;
        if (!data || !data.reviewID || !data.productID || !data.userID || !data.rating) {
            return res.status(200).json({
                EC: 400,
                EM: "Input is empty or incomplete",
                DT: ""
            });
        }
        let response = await createReview(data);
        return res.status(200).json({
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

// Update Review
const cupdateReview = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let useReviewID = req.query.useReviewID === "true"; // Kiểm tra nếu muốn cập nhật theo reviewID

        if (!id || !data) {
            return res.status(200).json({
                EC: 400,
                EM: "Invalid input",
                DT: ""
            });
        }

        let response = await updateReview(id, data, useReviewID);
        return res.status(200).json({
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

// Delete Review
const cdeleteReview = async (req, res) => {
    try {
        let id = req.params.id;
        let useReviewID = req.query.useReviewID === "true"; // Kiểm tra nếu muốn xóa theo reviewID
        if (!id) {
            return res.status(200).json({
                EC: 400,
                EM: "Review ID is required",
                DT: ""
            });
        }

        let response = await deleteReview(id, useReviewID);
        return res.status(200).json({
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

// Get Review (by id or all reviews for a product)
const cgetReview = async (req, res) => {
    try {
        let id = req.params.id;
        let useReviewID = req.query.useReviewID === "true";
        let productID = req.query.productID;
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 20;

        // Allowed query parameters
        const allowedQueries = ["page", "limit", "useReviewID", "productID"];
        const invalidQueries = Object.keys(req.query).filter(key => !allowedQueries.includes(key));
        if (invalidQueries.length > 0) {
            return res.status(400).json({
                EC: 400,
                EM: `Invalid query parameters: ${invalidQueries.join(", ")}`,
                DT: ""
            });
        }

        let response = await getReview(id, productID, useReviewID, page, limit);
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

export {
    ccreateReview as createReview,
    cupdateReview as updateReview,
    cdeleteReview as deleteReview,
    cgetReview as getReview
};
