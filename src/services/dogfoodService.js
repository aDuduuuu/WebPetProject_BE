import DogFood from "../models/dogfood.js";

// Create Dog Food
const createDogFood = async (data) => {
  try {
    const dogFood = await DogFood.create(data);
    return {
      EC: 0,
      EM: "Dog food created successfully",
      DT: dogFood,
    };
  } catch (error) {
    console.error("Error creating dog food:", error);

    // Bắt lỗi trùng tên (duplicate key)
    if (error.code === 11000 && error.keyPattern && error.keyPattern.name) {
      return {
        EC: 409,
        EM: "Tên món ăn đã tồn tại",
        DT: "",
      };
    }

    return {
      EC: 500,
      EM: "Error creating dog food",
      DT: error.message,
    };
  }
};


// Delete Dog Food
const deleteDogFood = async (id) => {
  try {
    const dogFood = await DogFood.findByIdAndDelete(id);
    if (!dogFood) {
      return {
        EC: 404,
        EM: "Dog food not found",
        DT: "",
      };
    }
    return {
      EC: 0,
      EM: "Dog food deleted successfully",
      DT: dogFood,
    };
  } catch (error) {
    console.error("Error deleting dog food:", error);
    return {
      EC: 500,
      EM: "Error deleting dog food",
      DT: error.message,
    };
  }
};

// Update Dog Food
const updateDogFood = async (id, data) => {
  try {
    const dogFood = await DogFood.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    if (!dogFood) {
      return {
        EC: 404,
        EM: "Dog food not found",
        DT: "",
      };
    }
    return {
      EC: 0,
      EM: "Dog food updated successfully",
      DT: dogFood,
    };
  } catch (error) {
    console.error("Error updating dog food:", error);
    return {
      EC: 500,
      EM: "Error updating dog food",
      DT: error.message,
    };
  }
};

// Get Dog Food (by ID or all with pagination)
const getDogFood = async (id, page = 1, limit = 10) => {
  try {
    if (id) {
      const dogFood = await DogFood.findById(id);
      if (!dogFood) {
        return {
          EC: 404,
          EM: "Dog food not found",
          DT: "",
        };
      }
      return {
        EC: 0,
        EM: "Dog food retrieved successfully",
        DT: dogFood,
      };
    } else {
      const skip = (page - 1) * limit;
      const dogFoods = await DogFood.find().limit(limit).skip(skip);
      return {
        EC: 0,
        EM: dogFoods.length ? "Dog foods retrieved successfully" : "No dog food found",
        DT: dogFoods,
      };
    }
  } catch (error) {
    console.error("Error retrieving dog food:", error);
    return {
      EC: 500,
      EM: "Error retrieving dog food",
      DT: error.message,
    };
  }
};

// Search Dog Foods with filters and pagination
const searchDogFoods = async (filters = {}, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const totalFoods = await DogFood.countDocuments(filters);
    const dogFoods = await DogFood.find(filters).limit(limit).skip(skip);

    return {
      EC: 0,
      EM: dogFoods.length ? "Dog foods found with filters" : "No dog foods match filters",
      DT: dogFoods,
      totalFoods,
    };
  } catch (error) {
    console.error("Error searching dog foods:", error);
    return {
      EC: 500,
      EM: "Error searching dog foods",
      DT: error.message,
    };
  }
};

// Search Dog Foods by Name
const searchDogFoodsByName = async (keyword, page = 1, limit = 10) => {
  try {
    const regex = new RegExp(keyword, "i");
    const skip = (page - 1) * limit;

    const totalFoods = await DogFood.countDocuments({ name: regex });
    const dogFoods = await DogFood.find({ name: regex })
      .limit(limit)
      .skip(skip)
      .select("name category isSafe image");

    return {
      EC: 0,
      EM: dogFoods.length ? "Dog foods found by name" : "No dog foods matched the name",
      DT: dogFoods,
      totalFoods,
    };
  } catch (error) {
    console.error("Error searching dog foods by name:", error);
    return {
      EC: 500,
      EM: "Error searching dog foods",
      DT: error.message,
    };
  }
};

export {
  createDogFood,
  deleteDogFood,
  updateDogFood,
  getDogFood,
  searchDogFoods,
  searchDogFoodsByName,
};
