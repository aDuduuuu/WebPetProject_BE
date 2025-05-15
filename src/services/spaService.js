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

      // Phân trang
      limit = parseInt(limit) || 20;
      page = parseInt(page) || 1;
      const skip = (page - 1) * limit;

      // Đếm tổng số Spa thỏa bộ lọc
      const totalSpas = await Spa.countDocuments(query);

      // Lấy dữ liệu phân trang
      const spas = await Spa.find(query).limit(limit).skip(skip);

      return {
        EC: 0,
        EM: spas.length ? "All Spas retrieved successfully" : "No Spas found",
        DT: spas,
        totalSpas,
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

// Search Spa by name (with pagination and case-insensitive)
const searchSpaByName = async (keyword, page = 1, limit = 10) => {
  try {
    const regex = new RegExp(keyword, "i"); // i = case-insensitive
    const skip = (page - 1) * limit;

    // Đếm tổng số Spa phù hợp
    const totalSpas = await Spa.countDocuments({ name: regex });

    // Tìm danh sách Spa phù hợp, chỉ lấy trường name và location
    const spas = await Spa.find({ name: regex })
      .limit(limit)
      .skip(skip)
      .select("name location image services"); // chọn các trường cần hiển thị

    return {
      EC: 0,
      EM: spas.length ? "Spa(s) found by name" : "No Spa matched the name",
      DT: spas,
      totalSpas,
    };
  } catch (error) {
    console.error("Error searching Spa by name:", error);
    return {
      EC: 500,
      EM: "Error searching Spa",
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

export { createSpa, deleteSpa, updateSpa, getSpa, getUniqueServices, searchSpaByName, };