import  Post  from "../models/post.js";

// Create Post
const createPost = async (data) => {
    try {
        console.log(data);
        let post = await Post.create(data);
        return {
            EC: 200,
            EM: "Post created successfully",
            DT: post
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

// Delete Post
const deletePost = async (id, usePostID = false) => {
    try {
        let post;
        if (usePostID) {
            // Delete post by postID
            post = await Post.findOneAndDelete({ postID: id });
        } else {
            // Delete post by MongoDB _id
            post = await Post.findByIdAndDelete(id);
        }

        if (!post) {
            return {
                EC: 404,
                EM: "Post not found",
                DT: ""
            };
        }

        return {
            EC: 200,
            EM: "Post deleted successfully",
            DT: post
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


// Update Post
const updatePost = async (id, data, usePostID = false) => {
    try {
        let post;
        if (usePostID) {
            // Update post by postID
            post = await Post.findOneAndUpdate({ postID: id }, data, { new: true });
        } else {
            // Update post by MongoDB _id
            post = await Post.findByIdAndUpdate(id, data, { new: true });
        }

        if (!post) {
            return {
                EC: 404,
                EM: "Post not found",
                DT: ""
            };
        }

        return {
            EC: 200,
            EM: "Post updated successfully",
            DT: post
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

// Get Post (by id or all posts)
const getPost = async (id, usePostID = false, page = 1, limit = 20, filters = {}, sortBy = '') => {
    try {
        let query = {};

        // Nếu có `id` hoặc `postID`, lấy bài đăng cụ thể
        if (id) {
            if (usePostID) {
                const post = await Post.findOne({ postID: id });
                if (!post) {
                    return { EC: 404, EM: "Post not found", DT: "" };
                }
                return { EC: 200, EM: "Post retrieved successfully", DT: post };
            } else {
                const post = await Post.findById(id);
                if (!post) {
                    return { EC: 404, EM: "Post not found", DT: "" };
                }
                return { EC: 200, EM: "Post retrieved successfully", DT: post };
            }
        }

        // Nếu không có id, áp dụng bộ lọc và sắp xếp cho danh sách bài đăng
        if (filters.category) {
            query.category = filters.category;
        }

        limit = parseInt(limit) || 20;
        page = parseInt(page) || 1;
        let skip = (page - 1) * limit;

        let sortOption = {};
        if (sortBy === 'time') sortOption.datePosted = -1;
        if (sortBy === 'otime') sortOption.datePosted = 1;

        const posts = await Post.find(query).limit(limit).skip(skip).sort(sortOption);

        if (!posts || posts.length === 0) {
            return { EC: 404, EM: "No posts found", DT: [] };
        }

        return { EC: 200, EM: "Posts retrieved successfully", DT: posts };
    } catch (error) {
        console.error("Error retrieving posts:", error);
        return { EC: 500, EM: "Error from server", DT: "" };
    }
};

const getPostCategories = async () => {
    try {
      const categories = await Post.distinct("category");
      return categories; // Returns an array of unique categories
    } catch (error) {
      console.error("Error fetching post categories:", error.message);
      throw new Error(error.message);
    }
  };
  

export { createPost, deletePost, updatePost, getPost, getPostCategories };
