const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    size_M: { type: Boolean, default: false },
    size_L: { type: Boolean, default: false },
    size_XL:{type:Boolean,default:false},
    prices: { type: Number, required: false },
    quantity: { type: Number, required: false },
    createAt: { type: String, required: false },
    description: { type: String, require: false },
    status: { type: String, required: false },
    image: { type: String, required: false },
    categoryId: { type: String, required: false },
});

module.exports = mongoose.model("Product", productsSchema);
