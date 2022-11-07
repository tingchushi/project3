const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
    itemId: { type: mongoose.Schema.Types.ObjectId, ref: "Item"}

})
cartSchema.virtual('Cart', {
	ref: 'User',
	localField: '_id',
	foreignField: 'email',
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;