import { createDogSeller, updateDogSeller, deleteDogSeller, getDogSeller } from "../services/dogsellerService.js";

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

// Get Dog Seller (by id or all sellers)
// const cgetDogSeller = async (req, res) => {
//     try {
//         let id = req.params.id;
//         let useSellerID = req.query.useSellerID === "true"; // Check if we want to search by sellerID
//         let response = await getDogSeller(id, useSellerID);
//         return res.status(200).json({
//             EC: response.EC,
//             EM: response.EM,
//             DT: response.DT
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             EC: 500,
//             EM: "Error from server",
//             DT: ""
//         });
//     }
// };

const cgetDogSeller = async (req, res) => {
    try {
        let id = req.params.id;
        let { page = 1, limit = 20, useSellerID = "false" } = req.query;

        // Allowed query parameters
        const allowedQueries = ["page", "limit", "useSellerID"];
        
        // Check for unexpected query parameters
        const invalidQueries = Object.keys(req.query).filter(key => !allowedQueries.includes(key));
        if (invalidQueries.length > 0) {
            return res.status(400).json({
                EC: 400,
                EM: `Invalid query parameters: ${invalidQueries.join(", ")}`,
                DT: ""
            });
        }

        // Parse page and limit as integers
        page = parseInt(page);
        limit = parseInt(limit);
        useSellerID = useSellerID === "true";

        // Call the service function
        let response = await getDogSeller(id, useSellerID, page, limit);
        return res.status(response.EC === 200 ? 200 : 400).json({
            EC: response.EC,
            EM: response.EM,
            DT: response.DT
        });
    } catch (error) {
        console.error("Error getting Dog Seller:", error.message);
        return res.status(500).json({
            EC: 500,
            EM: "Internal Server Error: " + error.message,
            DT: ""
        });
    }
};

export {
    ccreateDogSeller as createDogSeller,
    cupdateDogSeller as updateDogSeller,
    cdeleteDogSeller as deleteDogSeller,
    cgetDogSeller as getDogSeller
};
