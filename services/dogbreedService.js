import  DogBreed  from "../models/dogbreed.js";

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
    let dogBreed = await DogBreed.findByIdAndDelete(id);
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
    let dogBreed = await DogBreed.findByIdAndUpdate(id, data, { new: true });
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
    console.error("Error updating dog breed:", error);
    return {
      EC: 500,
      EM: "Error updating dog breed",
      DT: error.message,
    };
  }
};

// Get Dog Breed (by id or all breeds)
const getDogBreed = async (id) => {
  try {
    if (id) {
      let dogBreed = await DogBreed.findById(id);
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
      let dogBreeds = await DogBreed.find();
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

export { createDogBreed, deleteDogBreed, updateDogBreed, getDogBreed };
