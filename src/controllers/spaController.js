import {
  createSpa,
  updateSpa,
  deleteSpa,
  getSpa,
  getUniqueServices,
  searchSpaByName,
} from "../services/spaService.js";

// Create Spa
const createSpaController = async (req, res) => {
  try {
    const data = req.body;

    if (!data || !data.name || !data.image || !data.location || !data.services || !data.contactInfo || !data.description) {
      return res.status(400).json({
        EC: 400,
        EM: "Input is missing or incomplete",
        DT: ""
      });
    }

    const response = await createSpa(data);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error creating Spa:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Update Spa
const updateSpaController = async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (!id || !data) {
      return res.status(400).json({
        EC: 400,
        EM: "Invalid input",
        DT: ""
      });
    }

    const response = await updateSpa(id, data);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error updating Spa:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Delete Spa
const deleteSpaController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({
        EC: 400,
        EM: "Spa ID is required",
        DT: ""
      });
    }

    const response = await deleteSpa(id);
    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error deleting Spa:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Get Spa (by id or list with filters + pagination)
const getSpaController = async (req, res) => {
  try {
    const id = req.params.id;
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;

    const filters = {
      location: req.query.location,
      services: req.query.services ? req.query.services.split(",") : []
    };

    const response = await getSpa(id, page, limit, filters);
    return res.status(response.EC === 0 ? 200 : 404).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT,
      totalSpas: response.totalSpas || 0
    });
  } catch (error) {
    console.error("Error getting Spa:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Search Spa by name
const searchSpaByNameController = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const response = await searchSpaByName(keyword, page, limit);

    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT,
      totalSpas: response.totalSpas || 0
    });
  } catch (error) {
    console.error("Error searching Spa by name:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: ""
    });
  }
};

// Get unique services
const getServicesController = async (req, res) => {
  try {
    const response = await getUniqueServices();
    return res.status(response.EC === 0 ? 200 : 500).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT,
    });
  } catch (error) {
    console.error("Error getting services:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Internal Server Error: " + error.message,
      DT: "",
    });
  }
};

export {
  createSpaController as createSpa,
  updateSpaController as updateSpa,
  deleteSpaController as deleteSpa,
  getSpaController as getSpa,
  searchSpaByNameController as searchSpaByName,
  getServicesController as getServices,
};
