import { createDogBreed, updateDogBreed, deleteDogBreed, getDogBreed, searchDogBreeds, getDogBreedDetailsByName } from "../services/dogbreedService.js";

// Create Dog Breed
const createDogBreedController = async (req, res) => {
  try {
    const data = req.body;

    // Validate required fields
    const requiredFields = [
      "name", "image", "height", "weight", "lifespan", "affectionateWithFamily",
      "goodWithOtherDogs", "goodWithYoungChildren", "sheddingLevel", "coatGroomingFrequency",
      "droolingLevel", "coatType", "coatLength", "opennessToStrangers", "watchdogProtectiveNature",
      "playfulnessLevel", "adaptabilityLevel", "trainabilityLevel", "barkingLevel", "energyLevel",
      "mentalStimulationNeeds", "colors", "description", "history", "group", "activityLevel",
      "barkingLevelDescription", "size", "shedding", "trainability", "characteristics"
    ];

    for (const field of requiredFields) {
      if (!data[field]) {
        return res.status(400).json({
          EC: 400,
          EM: `Input is missing or incomplete: ${field} is required`,
          DT: ""
        });
      }
    }

    const response = await createDogBreed(data);
    return res.status(response.EC === 0 ? 200 : 409).json({
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
    const id = req.params.id;
    const data = req.body;

    if (!id) {
      return res.status(400).json({
        EC: 400,
        EM: "Dog Breed ID is required",
        DT: ""
      });
    }

    const response = await updateDogBreed(id, data);
    return res.status(response.EC === 0 ? 200 : response.EC === 409 ? 409 : 400).json({
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
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        EC: 400,
        EM: "Dog Breed ID is required",
        DT: ""
      });
    }

    const response = await deleteDogBreed(id);
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

// Get Dog Breed (by ID or all breeds with pagination)
const getDogBreedController = async (req, res) => {
  try {
    const id = req.params.id;
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;

    // Check for invalid query parameters
    const allowedQueries = ["page", "limit"];
    const invalidQueries = Object.keys(req.query).filter(key => !allowedQueries.includes(key));
    if (invalidQueries.length > 0) {
      return res.status(400).json({
        EC: 400,
        EM: `Invalid query parameters: ${invalidQueries.join(", ")}`,
        DT: ""
      });
    }

    const response = await getDogBreed(id, page, limit);
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

// Search Dog Breeds with filters and pagination
const searchDogBreedsController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;

    // Các tham số lọc được phép
    const allowedQueries = [
      "page", "limit", "group", "activityLevel", "barkingLevelDescription", 
      "size", "shedding", "characteristics", "coatType", "trainability"
    ];

    // Kiểm tra các tham số không hợp lệ
    const invalidQueries = Object.keys(req.query).filter(key => !allowedQueries.includes(key));
    if (invalidQueries.length > 0) {
      return res.status(400).json({
        EC: 400,
        EM: `Invalid query parameters: ${invalidQueries.join(", ")}`,
        DT: ""
      });
    }

    // Tạo bộ lọc từ các query parameters
    const filters = {};
    if (req.query.group) filters.group = req.query.group;
    if (req.query.activityLevel) filters.activityLevel = req.query.activityLevel;
    if (req.query.barkingLevelDescription) filters.barkingLevelDescription = req.query.barkingLevelDescription;
    if (req.query.size) filters.size = req.query.size;
    if (req.query.shedding) filters.shedding = req.query.shedding;
    if (req.query.characteristics) {
      // Chuyển đổi characteristics thành mảng để hỗ trợ nhiều giá trị
      filters.characteristics = { $in: req.query.characteristics.split(",") };
    }
    if (req.query.coatType) filters.coatType = req.query.coatType;
    if (req.query.trainability) filters.trainability = req.query.trainability;

    // Gọi service `searchDogBreeds` với các filters và thông tin phân trang
    const response = await searchDogBreeds(filters, page, limit);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error searching Dog Breeds:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Get Dog Breed Details by Name
const getDogBreedDetailsByNameController = async (req, res) => {
  try {
    const name = req.params.name;

    if (!name) {
      return res.status(400).json({
        EC: 400,
        EM: "Dog Breed name is required",
        DT: ""
      });
    }

    const response = await getDogBreedDetailsByName(name);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error getting Dog Breed details:", error.message);
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
  getDogBreedController as getDogBreed,
  searchDogBreedsController as searchDogBreeds,
  getDogBreedDetailsByNameController as getDogBreedDetailsByName
};