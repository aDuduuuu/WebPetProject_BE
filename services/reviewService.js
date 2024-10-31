import Review from "../models/review.js";

// Create Review
const createReview = async (data) => {
    try {
        console.log(data);
        let review = await Review.create(data);
        return {
            EC: 200,
            EM: "Review created successfully",
            DT: review
        };
    } catch (error) {
        console.error(error);
        return {
            EC: 500,
            EM: "Error from server",
            DT: ""
        };
    }
};

// Delete Review
const deleteReview = async (id, useReviewID = false) => {
    try {
        let review;
        if (useReviewID) {
            // Delete review by reviewID
            review = await Review.findOneAndDelete({ reviewID: id });
        } else {
            // Delete review by MongoDB _id
            review = await Review.findByIdAndDelete(id);
        }

        if (!review) {
            return {
                EC: 404,
                EM: "Review not found",
                DT: ""
            };
        }

        return {
            EC: 200,
            EM: "Review deleted successfully",
            DT: review
        };
    } catch (error) {
        console.error(error);
        return {
            EC: 500,
            EM: "Error from server",
            DT: ""
        };
    }
};

// Update Review
const updateReview = async (id, data, useReviewID = false) => {
    try {
        let review;
        if (useReviewID) {
            // Update review by reviewID
            review = await Review.findOneAndUpdate({ reviewID: id }, data, { new: true });
        } else {
            // Update review by MongoDB _id
            review = await Review.findByIdAndUpdate(id, data, { new: true });
        }

        if (!review) {
            return {
                EC: 404,
                EM: "Review not found",
                DT: ""
            };
        }

        return {
            EC: 200,
            EM: "Review updated successfully",
            DT: review
        };
    } catch (error) {
        console.error(error);
        return {
            EC: 500,
            EM: "Error from server",
            DT: ""
        };
    }
};

// Get Review (by id or all reviews for a product)
const getReview = async (id, productID = null, useReviewID = false) => {
    try {
        let review;
        if (useReviewID) {
            // Find review by reviewID
            review = await Review.findOne({ reviewID: id }).populate('productID userID');
        } else if (id) {
            // Find review by MongoDB _id
            review = await Review.findById(id).populate('productID userID');
        } else if (productID) {
            // Get all reviews for a specific product
            review = await Review.find({ productID }).populate('productID userID');
        } else {
            // Get all reviews
            review = await Review.find().populate('productID userID');
        }

        if (!review || (Array.isArray(review) && review.length === 0)) {
            return {
                EC: 404,
                EM: "Review(s) not found",
                DT: ""
            };
        }

        return {
            EC: 200,
            EM: "Success",
            DT: review
        };
    } catch (error) {
        console.error(error);
        return {
            EC: 500,
            EM: "Error from server",
            DT: ""
        };
    }
};

export { createReview, deleteReview, updateReview, getReview };
