const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    name: { type: String, require: true, unique: true },
    size: { type: String, default: false },
    prices: { type: Number, require: false },
    quantity: { type: Number, require: false },
    createAt: { type: String, required: false },
    description: { type: String, require: false },
    imagesProduct: { type: String, require: false },
    status:{type:String,require:false},
    categoryId: { type: String, required: false },

},

  
    
);
module.exports = mongoose.model('Product', ProductSchema);