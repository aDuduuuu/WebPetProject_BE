import Review from "../models/review.js";

// Create Review
const createReview = async (data) => {
    try {
        // Kiểm tra xem review đã tồn tại chưa
        let existingReview = await Review.findOne({
            userID: data.userID,
            productID: data.productID,
        });
        if (existingReview) {
            let updatedReview = await Review.findOneAndUpdate(existingReview._id, data, { new: true });
            return {
                EC: 0,
                EM: "Successfully",
                DT: updatedReview,
            };
        } else {
            // Nếu không tồn tại, tạo review mới
            let newReview = await Review.create({
                productID: data.productID,
                userID: data.userID,
                rating: +data.rating,
                comment: data.comment,

            });
            return {
                EC: 0,
                EM: "Successfully",
                DT: newReview,
            };
        }
    } catch (error) {
        console.error(error);
        return {
            EC: 500,
            EM: "Error from server",
            DT: "",
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
const getReview = async (id, productID = null, useReviewID = false, page = 1, limit = 20) => {
    try {
        let reviews;
        if (id) {
            reviews = useReviewID
                ? await Review.findOne({ reviewID: id }).populate('productID userID')
                : await Review.findById(id).populate('productID userID');
            if (!reviews) {
                return {
                    EC: 404,
                    EM: "Review not found",
                    DT: ""
                };
            }
        } else if (productID) {
            page = parseInt(page);
            limit = parseInt(limit);
            const skip = (page - 1) * limit;
            reviews = await Review.find({ productID }).limit(limit).skip(skip).populate('productID userID');
            if (!reviews || reviews.length === 0) {
                return {
                    EC: 404,
                    EM: "No reviews found",
                    DT: ""
                };
            }
        } else {
            page = parseInt(page);
            limit = parseInt(limit);
            const skip = (page - 1) * limit;
            reviews = await Review.find().limit(limit).skip(skip).populate('productID userID');
            if (!reviews || reviews.length === 0) {
                return {
                    EC: 404,
                    EM: "No reviews found",
                    DT: ""
                };
            }
        }
        return {
            EC: 0,
            EM: "Success",
            DT: reviews
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
