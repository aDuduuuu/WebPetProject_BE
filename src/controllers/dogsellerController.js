import { createDogSeller, updateDogSeller, deleteDogSeller, getDogSeller, getUniqueBreed } from "../services/dogsellerService.js";

// Create Dog Seller
const ccreateDogSeller = async (req, res) => {
    try {
        let data = req.body;
        if (!data || !data.sellerID || !data.name || !data.location || !data.breeds || !data.contactInfo) {
            return res.status(200).json({
                EC: 400,
                EM: "Input is empty or incomplete",
                DT: ""
            });
        }
        let response = await createDogSeller(data);
        return res.status(200).json({
            EC: response.EC,
            EM: response.EM,
            DT: response.DT
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 500,
            EM: "Error from server",
            DT: ""
        });
    }
};

// Update Dog Seller
const cupdateDogSeller = async (req, res) => {
    try {
        let id = req.params.id;
        let data = req.body;
        let useSellerID = req.query.useSellerID === "true"; // Check if we want to update by sellerID

        if (!id || !data) {
            return res.status(200).json({
                EC: 400,
                EM: "Invalid input",
                DT: ""
            });
        }

        let response = await updateDogSeller(id, data, useSellerID);
        return res.status(200).json({
            EC: response.EC,
            EM: response.EM,
            DT: response.DT
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 500,
            EM: "Error from server",
            DT: ""
        });
    }
};

// Delete Dog Seller
const cdeleteDogSeller = async (req, res) => {
    try {
        let id = req.params.id;
        let useSellerID = req.query.useSellerID === "true"; // Check if we want to delete by sellerID
        if (!id) {
            return res.status(200).json({
                EC: 400,
                EM: "Seller ID is required",
                DT: ""
            });
        }

        let response = await deleteDogSeller(id, useSellerID);
        return res.status(200).json({
            EC: response.EC,
            EM: response.EM,
            DT: response.DT
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            EC: 500,
            EM: "Error from server",
            DT: ""
        });
    }
};

const cgetDogSeller = async (req, res) => {
    try {
        let id = req.params.id;
        let useSellerID = req.query.useSellerID === "true";
        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 20;

        // Lấy bộ lọc từ query, chuyển đổi `breed` thành mảng nếu có nhiều giá trị
        const filters = {
            location: req.query.location,
            breed: req.query.breed ? req.query.breed.split(',') : [] // Tách chuỗi breed thành mảng
        };

        let response = await getDogSeller(id, useSellerID, page, limit, filters);

        return res.status(response.EC === 200 ? 200 : 404).json({
            EC: response.EC,
            EM: response.EM,
            DT: response.DT
        });
    } catch (error) {
        console.log("Error in cgetDogSeller:", error);
        return res.status(500).json({
            EC: 500,
            EM: "Error from server",
            DT: ""
        });
    }
};

const getBreedsController = async (req, res) => {
    try {
      const response = await getUniqueBreed();
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
    ccreateDogSeller as createDogSeller,
    cupdateDogSeller as updateDogSeller,
    cdeleteDogSeller as deleteDogSeller,
    cgetDogSeller as getDogSeller,
    getBreedsController
};