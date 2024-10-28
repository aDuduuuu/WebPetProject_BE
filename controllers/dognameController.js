import { createDogName, updateDogName, deleteDogName, getDogName } from "../services/dognameService.js";

// Create Dog Name
const createDogNameController = async (req, res) => {
  try {
    let data = req.body;

    // Validate input data
    if (!data || !data.name || !data.category) {
      return res.status(400).json({
        EC: 400,
        EM: "Input is missing or incomplete",
        DT: ""
      });
    }

    // Call createDogName from service
    let response = await createDogName(data);

    // Send response
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error creating Dog Name:", error.message);

    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Update Dog Name
const updateDogNameController = async (req, res) => {
  try {
    let id = req.params.id;
    let data = req.body;

    // Validate input data
    if (!id || !data) {
      return res.status(400).json({
        EC: 400,
        EM: "Invalid input",
        DT: ""
      });
    }

    // Call updateDogName from service
    let response = await updateDogName(id, data);

    // Send response
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error updating Dog Name:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Delete Dog Name
const deleteDogNameController = async (req, res) => {
  try {
    let id = req.params.id;

    // Validate ID
    if (!id) {
      return res.status(400).json({
        EC: 400,
        EM: "Dog Name ID is required",
        DT: ""
      });
    }

    // Call deleteDogName from service
    let response = await deleteDogName(id);

    // Send response
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error deleting Dog Name:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Get Dog Name (by id or all dog names)
const getDogNameController = async (req, res) => {
  try {
    let id = req.params.id; // Optional: fetch by ID if provided

    // Call getDogName from service
    let response = await getDogName(id);

    // Send response
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error getting Dog Name:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

export {
  createDogNameController as createDogName,
  updateDogNameController as updateDogName,
  deleteDogNameController as deleteDogName,
  getDogNameController as getDogName
};
