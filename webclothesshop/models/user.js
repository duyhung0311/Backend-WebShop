const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    fName: { type: String, required: true },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: { type: String, required: true },
    gender: { type: String, require: false },
    birthday: { type: Date, require: false },
    phone: { type: Number, require: false },
    isAdmin: { type: Boolean, required: true, default: false },
    isConfirm: { type: Boolean, require: true, default: false },
    isLock: { type: Boolean, require: true, default: false }
},
    { timestamps: true });

module.exports = mongoose.model('User', userSchema);