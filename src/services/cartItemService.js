import CartItem from "../models/cartitem.js";
import Cart from "../models/cart.js";
import Product from "../models/product.js";

// Create CartItem
const createCartItem = async (data) => {
    try {
        // Kiểm tra xem Product đã tồn tại chưa
        let product = await Product.findById(data.product);
        if (!product) {
            return {
                EC: 404,
                EM: "Product not found",
                DT: ""
            };
        }

        // Kiểm tra xem Cart đã tồn tại chưa
        let cart = await Cart.findOne({ userID: data.userID });
        if (!cart) {
            if (data.quantity > product.quantity) {
                data.quantity = product.quantity;
            }
            let cartItemNew = await CartItem.create({
                product: data.product,
                quantity: data.quantity
            });
            if (cartItemNew) {
                let cartNew = await Cart.create({ userID: data.userID, items: [cartItemNew._id] });
                if (cartNew) {
                    return {
                        EC: 0,
                        EM: "CartItem created successfully",
                        DT: cartItemNew
                    };
                }
            }
        } else {
            for (let i = 0; i < cart.items.length; i++) {
                let cartItem = await CartItem.findById(cart.items[i].toString());
                if (cartItem.product.toString() === data.product) {
                    if (cartItem.quantity + data.quantity > product.quantity) {
                        data.quantity = product.quantity - cartItem.quantity;
                    }
                    let cartItemUpdate = await CartItem.findByIdAndUpdate(cartItem._id, { quantity: cartItem.quantity + data.quantity }, { new: true });
                    if (cartItemUpdate) {
                        return {
                            EC: 0,
                            EM: "CartItem updated successfully",
                            DT: cartItemUpdate
                        };
                    }
                }
            }
            if (data.quantity > product.quantity) {
                data.quantity = product.quantity;
            }
            let cartItemNew = await CartItem.create({
                product: data.product,
                quantity: data.quantity
            });
            if (cartItemNew) {
                let cartUpdate = await Cart.findByIdAndUpdate(cart._id, { items: [...cart.items, cartItemNew._id] }, { new: true });
                if (cartUpdate) {
                    return {
                        EC: 0,
                        EM: "CartItem created successfully",
                        DT: cartItemNew
                    };
                }
            }
        }
    } catch (error) {
        console.error("Error creating CartItem:", error.message);
        return {
            EC: 500,
            EM: "Error creating CartItem",
            DT: error.message // Trả về chi tiết lỗi để dễ dàng debug
        };
    }
};

// Delete CartItem
const deleteCartItem = async (id, userId) => {
    try {
        let cart = await Cart.findOne({ userID: userId });
        if (cart) {
            let cartItemDeleted = await CartItem.findByIdAndDelete(id);
            if (!cartItemDeleted) {
                return {
                    EC: 404,
                    EM: "CartItem not found",
                    DT: ""
                };
            }
            let cartUpdate = await Cart.findByIdAndUpdate(cart._id, { items: cart.items.filter(item => item.toString() !== id) }, { new: true });
            if (cartUpdate) {
                return {
                    EC: 0,
                    EM: "CartItem deleted successfully",
                    DT: cartItemDeleted
                };
            }
        } else {
            return {
                EC: 404,
                EM: "Cart not found",
                DT: ""
            };
        }
    } catch (error) {
        console.error("Error deleting CartItem:", error.message);
        return {
            EC: 500,
            EM: "Error deleting CartItem",
            DT: error.message
        };
    }
};

// Update CartItem
const updateCartItem = async (id, data) => {
    try {
        let product = await Product.findById(data.product);
        if (!product) {
            return {
                EC: 404,
                EM: "Product not found",
                DT: ""
            };
        }
        if (data.quantity > product.quantity) {
            data.quantity = product.quantity;
        }
        // Tìm và cập nhật CartItem theo ID
        let cartItem = await CartItem.findByIdAndUpdate(id, { quantity: data.quantity }, { new: true }); // `new: true` trả về tài liệu đã cập nhật
        if (!cartItem) {
            return {
                EC: 404,
                EM: "CartItem not found",
                DT: ""
            };
        }
        return {
            EC: 0,
            EM: "CartItem updated successfully",
            DT: cartItem
        };
    } catch (error) {
        console.error("Error updating CartItem:", error.message);
        return {
            EC: 500,
            EM: "Error updating CartItem",
            DT: error.message
        };
    }
};

// Get CartItem (by id or all cartItems)
const getCartItem = async (data) => {
    try {
        let cartItems;
        if (data.id) {
            cartItems = await CartItem.findById(data.id);
            if (!cartItems) {
                return {
                    EC: 404,
                    EM: "CartItem not found",
                    DT: ""
                };
            } else {
                return {
                    EC: 0,
                    EM: "CartItem found",
                    DT: cartItems
                };
            }
        } else {
            let cart = await Cart.findOne({ userID: data.userID });
            if (cart) {
                cartItems = await CartItem.find({ _id: { $in: cart.items } }).limit(data.limit).skip(data.limit * (data.page - 1));
                for (let i = 0; i < cartItems.length; i++) {
                    let product = await Product.findById(cartItems[i].product.toString());

                    if (cartItems[i].quantity > product.quantity) {
                        await CartItem.findByIdAndUpdate(cartItems[i]._id, { quantity: product.quantity }, { new: true })
                        cartItems[i].quantity = product.quantity;
                    }
                    cartItems[i].product = product;
                }
                return {
                    EC: 0,
                    EM: "CartItems found",
                    DT: cartItems
                };
            }
        }
    } catch (error) {
        console.error("Error retrieving CartItem:", error.message);
        return {
            EC: 500,
            EM: "Error retrieving CartItem",
            DT: error.message
        };
    }
};

export { createCartItem, deleteCartItem, updateCartItem, getCartItem };
