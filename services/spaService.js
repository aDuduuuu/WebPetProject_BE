import { Spa } from "../models/spa.js";

const createSpa = async (data) => {
  try {
    // Tạo mới một Spa
    let spa = await Spa.create(data);
    return {
      EC: 0,
      EM: "Spa created successfully",
      DT: spa,
    };
  } catch (error) {
    console.error("Error creating Spa:", error);
    return {
      EC: 500,
      EM: "Error creating Spa",
      DT: error.message, // Trả về thông báo lỗi để dễ dàng debug
    };
  }
};

// Delete Spa
const deleteSpa = async (id) => {
  try {
    // Tìm và xóa Spa theo ID
    let spa = await Spa.findByIdAndDelete(id);
    if (!spa) {
      return {
        EC: 404,
        EM: "Spa not found",
        DT: "",
      };
    }
    return {
      EC: 0,
      EM: "Spa deleted successfully",
      DT: spa,
    };
  } catch (error) {
    console.error("Error deleting Spa:", error);
    return {
      EC: 500,
      EM: "Error deleting Spa",
      DT: error.message,
    };
  }
};

// Update Spa
const updateSpa = async (id, data) => {
  try {
    // Tìm và cập nhật Spa theo ID
    let spa = await Spa.findByIdAndUpdate(id, data, { new: true }); // `new: true` trả về tài liệu đã cập nhật
    if (!spa) {
      return {
        EC: 404,
        EM: "Spa not found",
        DT: "",
      };
    }
    return {
      EC: 0,
      EM: "Spa updated successfully",
      DT: spa,
    };
  } catch (error) {
    console.error("Error updating Spa:", error);
    return {
      EC: 500,
      EM: "Error updating Spa",
      DT: error.message,
    };
  }
};

// Get Spa (by id or all spas)
const getSpa = async (id) => {
  try {
    if (id) {
      // Tìm Spa theo ID
      let spa = await Spa.findById(id);
      if (!spa) {
        return {
          EC: 404,
          EM: "Spa not found",
          DT: "",
        };
      }
      return {
        EC: 0,
        EM: "Spa retrieved successfully",
        DT: spa,
      };
    } else {
      // Lấy tất cả Spa nếu không có ID
      let spas = await Spa.find();
      return {
        EC: 0,
        EM: "All Spas retrieved successfully",
        DT: spas,
      };
    }
  } catch (error) {
    console.error("Error retrieving Spa:", error);
    return {
      EC: 500,
      EM: "Error retrieving Spa",
      DT: error.message,
    };
  }
};

export { createSpa, deleteSpa, updateSpa, getSpa };
