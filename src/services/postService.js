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

        if (id) {
            const post = usePostID
                ? await Post.findOne({ postID: id })
                : await Post.findById(id);
            if (!post) {
                return { EC: 404, EM: "Post not found", DT: "" };
            }
            return { EC: 200, EM: "Post retrieved successfully", DT: post };
        }

        // Bộ lọc
        if (filters.category) {
            query.category = filters.category;
        }

        limit = parseInt(limit) || 20;
        page = parseInt(page) || 1;
        const skip = (page - 1) * limit;

        // Sắp xếp
        let sortOption = {};
        if (sortBy === 'time') sortOption.datePosted = -1;
        if (sortBy === 'otime') sortOption.datePosted = 1;

        const totalPosts = await Post.countDocuments(query);
        const posts = await Post.find(query).limit(limit).skip(skip).sort(sortOption);

        return {
            EC: 200,
            EM: posts.length ? "Posts retrieved successfully" : "No posts found",
            DT: posts,
            totalPosts
        };
    } catch (error) {
        console.error("Error retrieving posts:", error);
        return { EC: 500, EM: "Error from server", DT: "" };
    }
};

// Search Post by title (case-insensitive, with pagination)
const searchPostByTitle = async (keyword, page = 1, limit = 10) => {
    try {
      const regex = new RegExp(keyword, "i"); // Tìm kiếm không phân biệt hoa thường
      const skip = (page - 1) * limit;
  
      const totalPosts = await Post.countDocuments({ title: regex });
  
      const posts = await Post.find({ title: regex })
        .limit(limit)
        .skip(skip)
        .select("title image sdescription author postID category"); // Chọn trường cần thiết
  
      return {
        EC: 200,
        EM: posts.length ? "Posts found by title" : "No posts matched the title",
        DT: posts,
        totalPosts,
      };
    } catch (error) {
      console.error("Error searching Post by title:", error.message);
      return {
        EC: 500,
        EM: "Error searching Post",
        DT: error.message,
      };
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
  

export { createPost, deletePost, updatePost, getPost, getPostCategories, searchPostByTitle, };
