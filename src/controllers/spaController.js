import { createSpa, updateSpa, deleteSpa, getSpa } from "../services/spaService.js";

// Create Spa
const createSpaController = async (req, res) => {
  try {
    // Lấy dữ liệu từ body của yêu cầu
    let data = req.body;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!data || !data.name || !data.image || !data.location || !data.services || !data.contactInfo) {
      return res.status(400).json({
        EC: 400,
        EM: "Input is missing or incomplete",
        DT: ""
      });
    }

    // Gọi hàm tạo Spa từ service
    let response = await createSpa(data);

    // Trả về phản hồi với mã trạng thái 200 nếu thành công
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error creating Spa:", error.message);

    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Update Spa
const updateSpaController = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;

    if (!id || !data) {
      return res.status(400).json({
        EC: 400,
        EM: "Invalid input",
        DT: ""
      });
    }

    let response = await updateSpa(id, data);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error updating Spa:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Delete Spa
const deleteSpaController = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) {
      return res.status(400).json({
        EC: 400,
        EM: "Spa ID is required",
        DT: ""
      });
    }

    let response = await deleteSpa(id);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error deleting Spa:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Get Spa (by id or all spas)
const getSpaController = async (req, res) => {
  try {
    let id = req.params.id;
    let page = req.query.page || 1;
    let limit = req.query.limit || 20;

    // Lấy bộ lọc từ query
    const filters = {
      location: req.query.location,
      services: req.query.services ? req.query.services.split(',') : [] // Tách chuỗi services thành mảng
    };

    let response = await getSpa(id, page, limit, filters);

    return res.status(response.EC === 0 ? 200 : 404).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error getting Spa:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

export {
  createSpaController as createSpa,
  updateSpaController as updateSpa,
  deleteSpaController as deleteSpa,
  getSpaController as getSpa
};
