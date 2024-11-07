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

// Get Trainer (by id or all trainers)
const getTrainer = async (id, page = 1, limit = 20) => {
  try {
    let trainers;
    if (id) {
      trainers = await Trainer.findById(id);
      if (!trainers) {
        return {
          EC: 404,
          EM: "Trainer not found",
          DT: ""
        };
      }
    } else {
      page = parseInt(page);
      limit = parseInt(limit);
      const skip = (page - 1) * limit;
      trainers = await Trainer.find().limit(limit).skip(skip);
      if (!trainers || trainers.length === 0) {
        return {
          EC: 404,
          EM: "No trainers found",
          DT: ""
        };
      }
    }
    return {
      EC: 200,
      EM: "Success",
      DT: trainers
    };
  } catch (error) {
    console.error("Error retrieving Trainer:", error.message);
    return {
      EC: 500,
      EM: "Error retrieving Trainer",
      DT: error.message
    };
  }
};

export { createTrainer, deleteTrainer, updateTrainer, getTrainer };
