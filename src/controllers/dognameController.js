import { createDogName, updateDogName, deleteDogName, getDogName, getDogNamesByCategory  } from "../services/dognameService.js";

// Create Dog Name
const createDogNameController = async (req, res) => {
  try {
    let data = req.body;

    // Validate input data
    if (!data || !data.name || !data.category) {
      return res.status(400).json({
        EC: 400,
        EM: "Input is missing or incomplete",
        DT: ""
      });
    }

    // Call createDogName from service
    let response = await createDogName(data);

    // Send response
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error creating Dog Name:", error.message);

    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Update Dog Name
const updateDogNameController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    // Kiểm tra sự tồn tại của ID
    if (!id) {
      return res.status(400).json({
        EC: 400,
        EM: "Dog Name ID is required",
        DT: ""
      });
    }

    // Kiểm tra xem có dữ liệu trong body hay không
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({
        EC: 400,
        EM: "No update data provided",
        DT: ""
      });
    }

    // Kiểm tra xem có ít nhất một trường hợp lệ để cập nhật hay không
    const allowedFields = ["name", "category"];
    const invalidFields = Object.keys(data).filter((key) => !allowedFields.includes(key));
    if (invalidFields.length > 0) {
      return res.status(400).json({
        EC: 400,
        EM: `Invalid fields: ${invalidFields.join(", ")}`,
        DT: ""
      });
    }

    // Trường hợp chỉ có một trường được cung cấp, yêu cầu cung cấp thêm ít nhất một trường nữa
    if (Object.keys(data).length === 1) {
      return res.status(400).json({
        EC: 400,
        EM: "Please provide at least one more field to update",
        DT: ""
      });
    }

    // Gọi hàm updateDogName từ service
    const response = await updateDogName(id, data);

    // Gửi phản hồi
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error updating Dog Name:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "An error occurred while updating the dog name.",
      DT: ""
    });
  }
};

// Delete Dog Name
const deleteDogNameController = async (req, res) => {
  try {
    let id = req.params.id;

    // Validate ID
    if (!id) {
      return res.status(400).json({
        EC: 400,
        EM: "Dog Name ID is required",
        DT: ""
      });
    }

    // Call deleteDogName from service
    let response = await deleteDogName(id);

    // Send response
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error deleting Dog Name:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Get Dog Name (by id or all dog names)
const getDogNameController = async (req, res) => {
  try {
    let id = req.params.id;
    let page = req.query.page || 1;
    let limit = req.query.limit || 20;

    // Allowed query parameters
    const allowedQueries = ["page", "limit"];
    const invalidQueries = Object.keys(req.query).filter(key => !allowedQueries.includes(key));
    if (invalidQueries.length > 0) {
      return res.status(400).json({
        EC: 400,
        EM: `Invalid query parameters: ${invalidQueries.join(", ")}`,
        DT: ""
      });
    }

    let response = await getDogName(id, page, limit);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error getting Dog Name:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Get Dog Names by Category with Pagination
const getDogNamesByCategoryController = async (req, res) => {
  try {
    const category = req.params.category;
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;

    // Kiểm tra xem có category hay không
    if (!category) {
      return res.status(400).json({
        EC: 400,
        EM: "Category is required",
        DT: ""
      });
    }

    let response = await getDogNamesByCategory(category, page, limit);

    return res.status(response.EC === 0 ? 200 : 404).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error getting Dog Names by Category:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "An error occurred while retrieving dog names by category.",
      DT: ""
    });
  }
};

export {
  createDogNameController as createDogName,
  updateDogNameController as updateDogName,
  deleteDogNameController as deleteDogName,
  getDogNameController as getDogName,
  getDogNamesByCategoryController as getDogNamesByCategory
};
