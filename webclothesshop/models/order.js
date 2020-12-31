const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    name: { type: String, require: false, unique: false },
    phone: { type: String, required: false },
    address: { type: String, require: false },
    total: { type: Number, require: false },
    status: { type: Boolean, default: false },
    note: { type: String, required: false },
    createAt: { type: Date, require: false },
    doneAt: { type: Date, require: false },
    productlist: { type: Array, require: false },
    userId: { type: String, required: false },
});

module.exports = mongoose.model("Order", orderSchema);