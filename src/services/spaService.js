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

// Get Spa (by id or all spas with filters)
const getSpa = async (id, page = 1, limit = 20, filters = {}) => {
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
      // Áp dụng bộ lọc
      const query = {};

      // Lọc theo `province` trong `location`
      if (filters.location) {
        query["location.province"] = filters.location;
      }

      // Lọc theo nhiều `services` nếu có
      if (filters.services && filters.services.length > 0) {
        query["services"] = { $in: filters.services };
      }

      // Tính toán số lượng Spa cần bỏ qua
      limit = parseInt(limit) || 20;
      page = parseInt(page) || 1;
      let skip = (page - 1) * limit;

      // Lấy tất cả Spa với phân trang và bộ lọc
      let spas = await Spa.find(query).limit(limit).skip(skip);

      // Kiểm tra nếu không có Spa nào
      if (!spas || spas.length === 0) {
        return {
          EC: 404,
          EM: "No Spas found",
          DT: "",
        };
      }

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

const getUniqueServices = async () => {
  try {
    const services = await Spa.distinct("services"); // Get unique services
    return {
      EC: 0,
      EM: "Services retrieved successfully",
      DT: services,
    };
  } catch (error) {
    console.error("Error retrieving services:", error);
    return {
      EC: 500,
      EM: "Error retrieving services",
      DT: error.message,
    };
  }
};

export { createSpa, deleteSpa, updateSpa, getSpa, getUniqueServices };