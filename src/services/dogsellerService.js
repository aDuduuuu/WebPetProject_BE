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

const getDogSeller = async (id, useSellerID = false, page = 1, limit = 20, filters = {}) => {
    try {
        let query = {};

        if (id) {
            if (useSellerID) {
                const dogSeller = await DogSeller.findOne({ sellerID: id }).populate("breeds");
                if (!dogSeller) {
                    return { EC: 404, EM: "Dog seller not found", DT: "" };
                }
                return { EC: 200, EM: "Dog seller retrieved successfully", DT: dogSeller };
            } else {
                const dogSeller = await DogSeller.findById(id).populate("breeds");
                if (!dogSeller) {
                    return { EC: 404, EM: "Dog seller not found", DT: "" };
                }
                return { EC: 200, EM: "Dog seller retrieved successfully", DT: dogSeller };
            }
        }

        // Áp dụng bộ lọc `location`
        if (filters.location) {
            query.location = filters.location;
        }

        // Áp dụng bộ lọc `breeds` nếu là mảng
        if (filters.breed && filters.breed.length > 0) {
            query.breeds = { $in: filters.breed };
        }

        limit = parseInt(limit) || 20;
        page = parseInt(page) || 1;
        let skip = (page - 1) * limit;

        const dogSellers = await DogSeller.find(query).limit(limit).skip(skip).populate("breeds");

        if (!dogSellers || dogSellers.length === 0) {
            return { EC: 404, EM: "No dog sellers found", DT: [] };
        }

        return { EC: 200, EM: "Dog sellers retrieved successfully", DT: dogSellers };
    } catch (error) {
        console.error("Error retrieving dog sellers:", error);
        return { EC: 500, EM: "Error from server", DT: "" };
    }
};

const getUniqueBreed = async () => {
    try {
      const services = await DogSeller.distinct("breeds"); // Get unique services
      return {
        EC: 0,
        EM: "Services retrieved successfully",
        DT: services,
      };
    } catch (error) {
      console.error("Error retrieving services:", error);
      return {
        EC: 500,
        EM: "Error retrieving services",
        DT: error.message,
      };
    }
  };

export { createDogSeller, deleteDogSeller, updateDogSeller, getDogSeller , getUniqueBreed};