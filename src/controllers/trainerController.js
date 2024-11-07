import { createTrainer, updateTrainer, deleteTrainer, getTrainer } from "../services/trainerService.js";

// Create Trainer
const createTrainerController = async (req, res) => {
  try {
    let data = req.body;
    if (!data || !data.name || !data.image || !data.location || !data.services || !data.contactInfo) {
      return res.status(400).json({
        EC: 400,
        EM: "Input is missing or incomplete",
        DT: ""
      });
    }

    let response = await createTrainer(data);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error creating Trainer:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Update Trainer
const updateTrainerController = async (req, res) => {
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

    let response = await updateTrainer(id, data);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error updating Trainer:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Delete Trainer
const deleteTrainerController = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) {
      return res.status(400).json({
        EC: 400,
        EM: "Trainer ID is required",
        DT: ""
      });
    }

    let response = await deleteTrainer(id);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error deleting Trainer:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Get Trainer (by id or all trainers)
const getTrainerController = async (req, res) => {
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

    let response = await getTrainer(id, page, limit);
    return res.status(response.EC === 200 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error getting Trainer:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

export {
  createTrainerController as createTrainer,
  updateTrainerController as updateTrainer,
  deleteTrainerController as deleteTrainer,
  getTrainerController as getTrainer
};
