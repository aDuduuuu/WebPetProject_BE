import { addFavoriteItem, removeFavoriteItem, getFavoriteItems } from "../services/favoriteitemService.js";

// Add favorite item controller
const addFavoriteItemController = async (req, res) => {
  try {
    const { userID, type, referenceID } = req.body;

    if (!userID || !type || !referenceID) {
      return res.status(400).json({
        EC: 400,
        EM: "Missing input data",
        DT: ""
      });
    }

    const response = await addFavoriteItem(userID, type, referenceID);

    return res.status(response.EC === 0 ? 200 : 400).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error adding favorite item:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Server error: " + error.message,
      DT: ""
    });
  }
};

// Remove favorite item controller
// const removeFavoriteItemController = async (req, res) => {
//   try {
//     const { userID, referenceID } = req.body;

//     if (!userID || !referenceID) {
//       return res.status(400).json({
//         EC: 400,
//         EM: "Missing input data",
//         DT: ""
//       });
//     }

//     const response = await removeFavoriteItem(userID, referenceID);

//     return res.status(response.EC === 0 ? 200 : 404).json({
//       EC: response.EC,
//       EM: response.EM,
//       DT: response.DT
//     });
//   } catch (error) {
//     console.error("Error removing favorite item:", error.message);
//     return res.status(500).json({
//       EC: 500,
//       EM: "Server error: " + error.message,
//       DT: ""
//     });
//   }
// };
// controller.js
const removeFavoriteItemController = async (req, res) => {
  try {
    let id = req.params.id;

    if (!id) {
      return res.status(400).json({
        EC: 400,
        EM: "Missing _id",
        DT: ""
      });
    }

    const response = await removeFavoriteItem(id);  // Gọi service với _id

    return res.status(response.EC === 0 ? 200 : 404).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error removing favorite item:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Server error: " + error.message,
      DT: ""
    });
  }
};

// Get favorite items controller
const getFavoriteItemsController = async (req, res) => {
  try {
    const userID = req.params.userID;
    const type = req.query.type;

    if (!userID) {
      return res.status(400).json({
        EC: 400,
        EM: "Missing userID",
        DT: ""
      });
    }

    const response = await getFavoriteItems(userID, type);

    return res.status(response.EC === 0 ? 200 : 404).json({
      EC: response.EC,
      EM: response.EM,
      DT: response.DT
    });
  } catch (error) {
    console.error("Error getting favorite items:", error.message);
    return res.status(500).json({
      EC: 500,
      EM: "Server error: " + error.message,
      DT: ""
    });
  }
};

export { addFavoriteItemController, removeFavoriteItemController, getFavoriteItemsController };
