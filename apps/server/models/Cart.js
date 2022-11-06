const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
        postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    cart: { type: Array, required: true }
})

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;