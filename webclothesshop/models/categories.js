const mongoose=require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
    },
   createdAt:{
       type:String,
       require:false
   }
});

module.exports = mongoose.model("Category", categorySchema);
