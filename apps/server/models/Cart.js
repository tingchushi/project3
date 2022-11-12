const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item"}

})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;