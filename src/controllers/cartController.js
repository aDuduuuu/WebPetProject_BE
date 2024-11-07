// import { createCart, updateCart, deleteCart, getCart } from "../services/cartService.js";

// // Create Cart
// const ccreateCart = async (req, res) => {
//     try {
//         let data = req.body;
//         if (!data || !data.author || !data.title || !data.content || !data.image || !data.cartID) {
//             return res.status(200).json({
//                 EC: 400,
//                 EM: "Input is empty",
//                 DT: ""
//             });
//         }
//         let response = await createCart(data);
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

// // Update Cart
// const cupdateCart = async (req, res) => {
//     try {
//         let id = req.params.id;
//         let data = req.body;
//         let useCartID = req.query.useCartID === "true"; // Check if we want to update by cartID

//         if (!id || !data) {
//             return res.status(200).json({
//                 EC: 400,
//                 EM: "Invalid input",
//                 DT: ""
//             });
//         }

//         let response = await updateCart(id, data, useCartID);
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


// // Delete Cart
// const cdeleteCart = async (req, res) => {
//     try {
//         let id = req.params.id;
//         let useCartID = req.query.useCartID === "true"; // Check if we want to delete by cartID
//         if (!id) {
//             return res.status(200).json({
//                 EC: 400,
//                 EM: "Cart ID is required",
//                 DT: ""
//             });
//         }

//         let response = await deleteCart(id, useCartID);
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

// // Get Cart (by id or all carts with pagination)
// const cgetCart = async (req, res) => {
//     try {
//         let id = req.params.id;
//         let useCartID = req.query.useCartID === "true";
//         let page = parseInt(req.query.page) || 1;
//         let limit = parseInt(req.query.limit) || 20;

//         // Allowed query parameters
//         const allowedQueries = ["page", "limit", "useCartID"];
//         const invalidQueries = Object.keys(req.query).filter(key => !allowedQueries.includes(key));
//         if (invalidQueries.length > 0) {
//             return res.status(400).json({
//                 EC: 400,
//                 EM: `Invalid query parameters: ${invalidQueries.join(", ")}`,
//                 DT: ""
//             });
//         }

//         let response = await getCart(id, useCartID, page, limit);
//         return res.status(response.EC === 200 ? 200 : 400).json({
//             EC: response.EC,
//             EM: response.EM,
//             DT: response.DT
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             EC: 500,
//             EM: "Error from server",
//             DT: ""
//         });
//     }
// };

// export { ccreateCart as createCart, cupdateCart as updateCart, cdeleteCart as deleteCart, cgetCart as getCart };
