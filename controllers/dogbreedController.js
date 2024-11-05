import { createDogBreed, updateDogBreed, deleteDogBreed, getDogBreed } from "../services/dogbreedService.js";

// Create Dog Breed
const createDogBreedController = async (req, res) => {
  try {
    // Lấy dữ liệu từ body của yêu cầu
    let data = req.body;

    // Kiểm tra tính hợp lệ của dữ liệu đầu vào
    if (!data || !data.name || !data.image || !data.height || !data.weight || !data.lifespan || !data.affectionateWithFamily || 
        !data.goodWithOtherDogs || !data.goodWithYoungChildren || !data.sheddingLevel || 
        !data.coatGroomingFrequency || !data.droolingLevel || !data.coatType || !data.coatLength || 
        !data.opennessToStrangers || !data.watchdogProtectiveNature || !data.playfulnessLevel || 
        !data.adaptabilityLevel || !data.trainabilityLevel || !data.barkingLevel || !data.energyLevel || 
        !data.mentalStimulationNeeds || !data.colors || !data.description || !data.history) {
      return res.status(400).json({
        EC: 400,
        EM: "Input is missing or incomplete",
        DT: ""
      });
    }

    // Gọi hàm tạo Dog Breed từ service
    let response = await createDogBreed(data);

    // Trả về phản hồi với mã trạng thái 200 nếu thành công
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error creating Dog Breed:", error.message);

    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Update Dog Breed
const updateDogBreedController = async (req, res) => {
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

    let response = await updateDogBreed(id, data);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error updating Dog Breed:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Delete Dog Breed
const deleteDogBreedController = async (req, res) => {
  try {
    let id = req.params.id;
    if (!id) {
      return res.status(400).json({
        EC: 400,
        EM: "Dog Breed ID is required",
        DT: ""
      });
    }

    let response = await deleteDogBreed(id);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error deleting Dog Breed:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Get Dog Breed (by id or all breeds)
const getDogBreedController = async (req, res) => {
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

    let response = await getDogBreed(id, page, limit);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error getting Dog Breed:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

export {
  createDogBreedController as createDogBreed,
  updateDogBreedController as updateDogBreed,
  deleteDogBreedController as deleteDogBreed,
  getDogBreedController as getDogBreed
};
