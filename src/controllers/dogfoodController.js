import {
  createDogFood,
  updateDogFood,
  deleteDogFood,
  getDogFood,
  searchDogFoods,
  searchDogFoodsByName
} from "../services/dogfoodService.js";

// Create Dog Food
const createDogFoodController = async (req, res) => {
  try {
    const data = req.body;

    if (!data.name || typeof data.isSafe !== 'boolean' || !data.effects) {
      let missingField = '';
      if (!data.name) missingField = 'name';
      else if (typeof data.isSafe !== 'boolean') missingField = 'isSafe';
      else if (!data.effects) missingField = 'effects';
    
      return res.status(400).json({
        EC: 400,
        EM: `Missing required field: ${missingField}`,
        DT: ""
      });
    }    

    const response = await createDogFood(data);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error creating Dog Food:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Update Dog Food
const updateDogFoodController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!id) {
      return res.status(400).json({
        EC: 400,
        EM: "Dog Food ID is required",
        DT: ""
      });
    }

    const response = await updateDogFood(id, data);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error updating Dog Food:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Delete Dog Food
const deleteDogFoodController = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).json({
        EC: 400,
        EM: "Dog Food ID is required",
        DT: ""
      });
    }

    const response = await deleteDogFood(id);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error deleting Dog Food:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Get Dog Food (by ID or all with pagination)
const getDogFoodController = async (req, res) => {
  try {
    const id = req.params.id;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const response = await getDogFood(id, page, limit);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error getting Dog Food:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Search Dog Foods with filters
const searchDogFoodsController = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = parseInt(req.query.limit) || 10;

    const filters = {};
    if (req.query.name) filters.name = { $regex: req.query.name, $options: "i" };
    if (req.query.category) filters.category = req.query.category;
    if (req.query.isSafe !== undefined) filters.isSafe = req.query.isSafe === "true";

    const response = await searchDogFoods(filters, page, limit);

    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT,
      totalFoods: response.totalFoods || 0
    });
  } catch (error) {
    console.error("Error searching Dog Foods:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Search Dog Foods by Name
const searchDogFoodsByNameController = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const response = await searchDogFoodsByName(keyword, page, limit);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT,
      totalFoods: response.totalFoods || 0
    });
  } catch (error) {
    console.error("Error searching Dog Foods by name:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

export {
  createDogFoodController as createDogFood,
  updateDogFoodController as updateDogFood,
  deleteDogFoodController as deleteDogFood,
  getDogFoodController as getDogFood,
  searchDogFoodsController as searchDogFoods,
  searchDogFoodsByNameController as searchDogFoodsByName
};
