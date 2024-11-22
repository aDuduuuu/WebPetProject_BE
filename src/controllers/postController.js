import { createPost, updatePost, deletePost, getPost, getPostCategories } from "../services/postService.js";

// Create Post
const ccreatePost = async (req, res) => {
    try {
        let data = req.body;
        if (!data || !data.sdescription || !data.author || !data.category || !data.title || !data.content || !data.image || !data.postID) {
            return res.status(400).json({
                EC: 400,
                EM: "Input is empty",
                DT: ""
            });
        }
        let response = await createPost(data);
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

// Update Post
const cupdatePost = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let usePostID = req.query.usePostID === "true"; // Check if we want to update by postID

        if (!id || !data) {
            return res.status(200).json({
                EC: 400,
                EM: "Invalid input",
                DT: ""
            });
        }

        let response = await updatePost(id, data, usePostID);
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


// Delete Post
const cdeletePost = async (req, res) => {
    try {
        let id = req.params.id;
        let usePostID = req.query.usePostID === "true"; // Check if we want to delete by postID
        if (!id) {
            return res.status(200).json({
                EC: 400,
                EM: "Post ID is required",
                DT: ""
            });
        }

        let response = await deletePost(id, usePostID);
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

// Get Post (by id or all posts with pagination)
const cgetPost = async (req, res) => {
    try {
        let id = req.params.id;
        let usePostID = req.query.usePostID === "true";
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 20;

        const filters = {
            category: req.query.category
        };

        const sortBy = req.query.sortBy || '';

        let response = await getPost(id, usePostID, page, limit, filters, sortBy);

        return res.status(response.EC === 200 ? 200 : 404).json({
            EC: response.EC,
            EM: response.EM,
            DT: response.DT
        });
    } catch (error) {
        console.log("Error in cgetPost:", error);
        return res.status(500).json({
            EC: 500,
            EM: "Error from server",
            DT: ""
        });
    }
};

const getAllPostCategories = async (req, res) => {
    try {
      const categories = await getPostCategories();
      if (categories) {
        return res.status(200).json({
          EC: 0,
          EM: "Post categories retrieved successfully",
          DT: categories,
        });
      } else {
        return res.status(404).json({
          EC: 1,
          EM: "No categories found",
          DT: [],
        });
      }
    } catch (error) {
      console.error("Error retrieving post categories:", error.message);
      return res.status(500).json({
        EC: 500,
        EM: "Internal Server Error",
        DT: "",
      });
    }
  };

export { ccreatePost as createPost, cupdatePost as updatePost, cdeletePost as deletePost, cgetPost as getPost, getAllPostCategories };
