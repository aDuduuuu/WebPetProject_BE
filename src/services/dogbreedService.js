import DogBreed from "../models/dogbreed.js";

// Create Dog Breed
const createDogBreed = async (data) => {
  try {
    let dogBreed = await DogBreed.create(data);
    return {
      EC: 0,
      EM: "Dog breed created successfully",
      DT: dogBreed,
    };
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      // Lỗi trùng lặp tên
      return {
        EC: 400,
        EM: "Dog breed name already exists",
        DT: ""
      };
    }
    console.error("Error creating dog breed:", error);
    return {
      EC: 500,
      EM: "Error creating dog breed",
      DT: error.message,
    };
  }
};

// Delete Dog Breed
const deleteDogBreed = async (id) => {
  try {
    const dogBreed = await DogBreed.findByIdAndDelete(id);
    if (!dogBreed) {
      return {
        EC: 404,
        EM: "Dog breed not found",
        DT: "",
      };
    }
    return {
      EC: 0,
      EM: "Dog breed deleted successfully",
      DT: dogBreed,
    };
  } catch (error) {
    console.error("Error deleting dog breed:", error);
    return {
      EC: 500,
      EM: "Error deleting dog breed",
      DT: error.message,
    };
  }
};

// Update Dog Breed
const updateDogBreed = async (id, data) => {
  try {
    let dogBreed = await DogBreed.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!dogBreed) {
      return {
        EC: 404,
        EM: "Dog breed not found",
        DT: "",
      };
    }
    return {
      EC: 0,
      EM: "Dog breed updated successfully",
      DT: dogBreed,
    };
  } catch (error) {
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      // Lỗi trùng lặp tên khi cập nhật
      return {
        EC: 400,
        EM: "Dog breed name already exists",
        DT: ""
      };
    }
    console.error("Error updating dog breed:", error);
    return {
      EC: 500,
      EM: "Error updating dog breed",
      DT: error.message,
    };
  }
};

// Get Dog Breed (by ID or all breeds with pagination)
const getDogBreed = async (id, page = 1, limit) => {
  try {
    if (id) {
      const dogBreed = await DogBreed.findById(id);
      if (!dogBreed) {
        return {
          EC: 404,
          EM: "Dog breed not found",
          DT: "",
        };
      }
      return {
        EC: 0,
        EM: "Dog breed retrieved successfully",
        DT: dogBreed,
      };
    } else {
      limit = parseInt(limit);
      page = parseInt(page) || 1;
      const skip = (page - 1) * limit;

      // Chỉ lấy ra các trường name và description
      const dogBreeds = await DogBreed.find({}, "name description").limit(limit).skip(skip);

      if (!dogBreeds || dogBreeds.length === 0) {
        return {
          EC: 404,
          EM: "No dog breeds found",
          DT: "",
        };
      }

      return {
        EC: 0,
        EM: "All dog breeds retrieved successfully",
        DT: dogBreeds,
      };
    }
  } catch (error) {
    console.error("Error retrieving dog breed:", error);
    return {
      EC: 500,
      EM: "Error retrieving dog breed",
      DT: error.message,
    };
  }
};

// Search Dog Breeds with filters and pagination
const searchDogBreeds = async (filters, page = 1, limit) => {
  try {
    const skip = (page - 1) * limit;

    // Tính tổng số giống chó dựa trên bộ lọc
    const totalBreeds = await DogBreed.countDocuments(filters);

    // Lấy danh sách giống chó theo bộ lọc và phân trang
    const dogBreeds = await DogBreed.find(filters)
      .limit(limit)
      .skip(skip);

    return {
      EC: 0,
      EM: dogBreeds.length ? "Dog breeds retrieved successfully" : "No dog breeds found for the given filters",
      DT: dogBreeds,
      totalBreeds, // Trả về tổng số lượng giống chó sau khi áp dụng bộ lọc
    };
  } catch (error) {
    console.error("Error retrieving dog breeds with filters:", error);
    return {
      EC: 500,
      EM: "Error retrieving dog breeds",
      DT: error.message,
    };
  }
};

// Get Dog Breed Details by Name
const getDogBreedDetailsByName = async (name) => {
  try {
    const dogBreed = await DogBreed.findOne({ name }).select(
      "name image height weight lifespan affectionateWithFamily goodWithOtherDogs goodWithYoungChildren sheddingLevel coatGroomingFrequency droolingLevel coatType coatLength opennessToStrangers watchdogProtectiveNature playfulnessLevel adaptabilityLevel trainabilityLevel barkingLevel energyLevel mentalStimulationNeeds colors description history"
    );

    if (!dogBreed) {
      return {
        EC: 404,
        EM: "Dog breed not found",
        DT: "",
      };
    }

    return {
      EC: 0,
      EM: "Dog breed details retrieved successfully",
      DT: dogBreed,
    };
  } catch (error) {
    console.error("Error retrieving dog breed details:", error);
    return {
      EC: 500,
      EM: "Error retrieving dog breed details",
      DT: error.message,
    };
  }
};

export { createDogBreed, deleteDogBreed, updateDogBreed, getDogBreed, searchDogBreeds, getDogBreedDetailsByName };