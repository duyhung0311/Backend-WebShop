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
            "Item created":listCate
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
            "Category by Id":categories
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
            "Update successful":update,
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
        categories = await Category.findByIdAndRemove(id);
        return res.json({
            message: true,
            "Delete successful": categories,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error"
        });
    }
}
module.exports = { createCategory, getlistCategory, getCateByID,updateCate,deleteCate};