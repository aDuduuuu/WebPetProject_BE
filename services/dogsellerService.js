import DogSeller from "../models/dogSeller.js";

// Create Dog Seller
const createDogSeller = async (data) => {
    try {
        console.log(data);
        let seller = await DogSeller.create(data);
        return {
            EC: 200,
            EM: "Dog Seller created successfully",
            DT: seller
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 500,
            EM: "Error from server",
            DT: ""
        };
    }
};

// Delete Dog Seller
const deleteDogSeller = async (id, useSellerID = false) => {
    try {
        let seller;
        if (useSellerID) {
            // Delete seller by sellerID
            seller = await DogSeller.findOneAndDelete({ sellerID: id });
        } else {
            // Delete seller by MongoDB _id
            seller = await DogSeller.findByIdAndDelete(id);
        }

        if (!seller) {
            return {
                EC: 404,
                EM: "Dog Seller not found",
                DT: ""
            };
        }

        return {
            EC: 200,
            EM: "Dog Seller deleted successfully",
            DT: seller
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 500,
            EM: "Error from server",
            DT: ""
        };
    }
};

// Update Dog Seller
const updateDogSeller = async (id, data, useSellerID = false) => {
    try {
        let seller;
        if (useSellerID) {
            // Update seller by sellerID
            seller = await DogSeller.findOneAndUpdate({ sellerID: id }, data, { new: true });
        } else {
            // Update seller by MongoDB _id
            seller = await DogSeller.findByIdAndUpdate(id, data, { new: true });
        }

        if (!seller) {
            return {
                EC: 404,
                EM: "Dog Seller not found",
                DT: ""
            };
        }

        return {
            EC: 200,
            EM: "Dog Seller updated successfully",
            DT: seller
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 500,
            EM: "Error from server",
            DT: ""
        };
    }
};

// Get Dog Seller (by id or all sellers)
const getDogSeller = async (id, useSellerID = false) => {
    try {
        let seller;
        if (useSellerID) {
            // Find seller by sellerID
            seller = await DogSeller.findOne({ sellerID: id }).populate('breeds');
        } else if (id) {
            // Find seller by MongoDB _id
            seller = await DogSeller.findById(id).populate('breeds');
        } else {
            // Get all sellers
            seller = await DogSeller.find().populate('breeds');
        }

        if (!seller) {
            return {
                EC: 404,
                EM: "Dog Seller not found",
                DT: ""
            };
        }

        return {
            EC: 200,
            EM: "Success",
            DT: seller
        };
    } catch (error) {
        console.log(error);
        return {
            EC: 500,
            EM: "Error from server",
            DT: ""
        };
    }
};

export { createDogSeller, deleteDogSeller, updateDogSeller, getDogSeller };
