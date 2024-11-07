import FavoriteItem from "../models/favoriteitem.js";

// Add a favorite item
const addFavoriteItem = async (userID, itemID, type, referenceID) => {
  try {
    const existingItem = await FavoriteItem.findOne({ userID, itemID });
    if (existingItem) {
      return {
        EC: 400,
        EM: "This item is already in the favorites list",
        DT: existingItem
      };
    }

    const newItem = await FavoriteItem.create({ userID, itemID, type, referenceID });
    return {
      EC: 0,
      EM: "Successfully added to favorites",
      DT: newItem
    };
  } catch (error) {
    console.error("Error adding favorite item:", error);
    return {
      EC: 500,
      EM: "Error adding to favorites",
      DT: error.message
    };
  }
};

// Remove a favorite item
const removeFavoriteItem = async (userID, itemID) => {
  try {
    const deletedItem = await FavoriteItem.findOneAndDelete({ userID, itemID });
    if (!deletedItem) {
      return {
        EC: 404,
        EM: "Favorite item not found",
        DT: ""
      };
    }

    return {
      EC: 0,
      EM: "Successfully removed from favorites",
      DT: deletedItem
    };
  } catch (error) {
    console.error("Error removing favorite item:", error);
    return {
      EC: 500,
      EM: "Error removing from favorites",
      DT: error.message
    };
  }
};

// Get favorite items
const getFavoriteItems = async (userID, type) => {
  try {
    const query = { userID };
    if (type) {
      query.type = type;
    }

    const favoriteItems = await FavoriteItem.find(query).populate('referenceID');

    if (favoriteItems.length === 0) {
      return {
        EC: 404,
        EM: "No favorite items found",
        DT: []
      };
    }

    return {
      EC: 0,
      EM: "Favorites retrieved successfully",
      DT: favoriteItems
    };
  } catch (error) {
    console.error("Error getting favorite items:", error);
    return {
      EC: 500,
      EM: "Error retrieving favorites",
      DT: error.message
    };
  }
};

export { addFavoriteItem, removeFavoriteItem, getFavoriteItems };
