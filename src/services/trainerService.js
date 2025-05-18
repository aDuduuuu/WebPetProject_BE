import { Trainer } from "../models/trainer.js";

// Create Trainer
const createTrainer = async (data) => {
  try {
    // Tạo mới một Trainer
    let trainer = await Trainer.create(data);
    return {
      EC: 0,
      EM: "Trainer created successfully",
      DT: trainer
    };
  } catch (error) {
    console.error("Error creating Trainer:", error.message);
    return {
      EC: 500,
      EM: "Error creating Trainer",
      DT: error.message // Trả về chi tiết lỗi để dễ dàng debug
    };
  }
};

// Delete Trainer
const deleteTrainer = async (id) => {
  try {
    // Tìm và xóa Trainer theo ID
    let trainer = await Trainer.findByIdAndDelete(id);
    if (!trainer) {
      return {
        EC: 404,
        EM: "Trainer not found",
        DT: ""
      };
    }
    return {
      EC: 0,
      EM: "Trainer deleted successfully",
      DT: trainer
    };
  } catch (error) {
    console.error("Error deleting Trainer:", error.message);
    return {
      EC: 500,
      EM: "Error deleting Trainer",
      DT: error.message
    };
  }
};

// Update Trainer
const updateTrainer = async (id, data) => {
  try {
    // Tìm và cập nhật Trainer theo ID
    let trainer = await Trainer.findByIdAndUpdate(id, data, { new: true }); // `new: true` trả về tài liệu đã cập nhật
    if (!trainer) {
      return {
        EC: 404,
        EM: "Trainer not found",
        DT: ""
      };
    }
    return {
      EC: 0,
      EM: "Trainer updated successfully",
      DT: trainer
    };
  } catch (error) {
    console.error("Error updating Trainer:", error.message);
    return {
      EC: 500,
      EM: "Error updating Trainer",
      DT: error.message
    };
  }
};

// Get Trainer (by id or all trainers with filters + pagination)
const getTrainer = async (id, page = 1, limit = 20, filters = {}) => {
  try {
    if (id) {
      const trainer = await Trainer.findById(id);
      if (!trainer) {
        return {
          EC: 404,
          EM: "Trainer not found",
          DT: "",
        };
      }
      return {
        EC: 0,
        EM: "Trainer retrieved successfully",
        DT: trainer,
      };
    } else {
      const query = {};

      if (filters.location) {
        query["location.province"] = filters.location;
      }

      if (filters.services && filters.services.length > 0) {
        query["services"] = { $in: filters.services };
      }

      limit = parseInt(limit) || 20;
      page = parseInt(page) || 1;
      const skip = (page - 1) * limit;

      const totalTrainers = await Trainer.countDocuments(query);
      const trainers = await Trainer.find(query).limit(limit).skip(skip);

      return {
        EC: 0,
        EM: trainers.length ? "Trainers retrieved successfully" : "No trainers found",
        DT: trainers,
        totalTrainers,
      };
    }
  } catch (error) {
    console.error("Error retrieving Trainer:", error.message);
    return {
      EC: 500,
      EM: "Error retrieving Trainer",
      DT: error.message,
    };
  }
};


const getUniqueServices = async () => {
  try {
    const services = await Trainer.distinct("services"); // Get unique services
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

// Search Trainer by name (with pagination and case-insensitive)
const searchTrainerByName = async (keyword, page = 1, limit = 10) => {
  try {
    const regex = new RegExp(keyword, "i"); // case-insensitive
    const skip = (page - 1) * limit;

    // Đếm số trainer phù hợp
    const totalTrainers = await Trainer.countDocuments({ name: regex });

    // Tìm trainer khớp tên (chỉ lấy một số trường cần thiết nếu muốn)
    const trainers = await Trainer.find({ name: regex })
      .limit(limit)
      .skip(skip)
      .select("name location image services"); // tùy chọn trường trả về

    return {
      EC: 0,
      EM: trainers.length ? "Trainer(s) found by name" : "No Trainer matched the name",
      DT: trainers,
      totalTrainers,
    };
  } catch (error) {
    console.error("Error searching Trainer by name:", error.message);
    return {
      EC: 500,
      EM: "Error searching Trainer",
      DT: error.message,
    };
  }
};


export { createTrainer, deleteTrainer, updateTrainer, getTrainer, getUniqueServices, searchTrainerByName };
