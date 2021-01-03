const mongoose = require("mongoose");
const Category = require("../models/categories");
const createCategory = async (req, res) => {
    const createCate = new Category({
        name: req.body.name,
        createdAt: req.body.createdAt
    });
    try {
        const create = await createCate.save();
        return res.json({
            "success": true,
            "itemCreated": createCate
        });
    } catch (error) {
        res.json({ message: "error" });
    }
}
const getlistCategory = async (req, res) => {
    let listCate;
    try {
        listCate= await Category.find();
        return res.json({
            message:true,
            "ListCateCreated":listCate
        });
    } catch (error) {
        res.json({
            message:"Error, try again"
        });
    }
}

const getCateByID = async(req,res) =>{
    const id = req.params.cid;
    let categories;
    try {
        categories= await Category.findById(id);
        return res.json({
            message:true,
            "CategorybyIdCreated":categories
        })
    } catch (error) {
        res.status(500).json({
            message:"Error"
        })
    }

}
const updateCate = async (req,res)=>{
    const id =req.params.cid;
    const update = {
        name: req.body.name,
        createdAt: req.body.createdAt
    }
    let categories;
    try {
        categories=await Category.findByIdAndUpdate(id,update);
        return res.json({
            message:true,
            "UpdateCreated":update,
        });
    } catch (error) {
        res.status(500).json({
            message:"Error"
        });
    }
}
const deleteCate = async (req, res) => {
    const id = req.params.cid;
    let categories;
    try {
        categories = await Category.findByIdAndDelete(id);
        return res.json({
            message: true,
            "DeleteSuccessfully": categories,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error"
        });
    }
}
// const getProductByCateId = async (req, res, next) => {
//     const CateId = req.params.cid;
//     let products;
//     products = await Product.find({ categoryId: CateId });   
//     try {
//         res.status(200).json({
//             products,
//         })
//     } catch (error) {
//         res.status(500).json({
//             message:"Error"
//         })
//     }
// };
module.exports = { createCategory, getlistCategory, getCateByID,updateCate,deleteCate};