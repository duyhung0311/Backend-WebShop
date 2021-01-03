const mongoose = require("mongoose");
const Product = require("../models/product");
const Category = require("../models/categories");

const createProduct = async (req, res) => {
    

    const createPro = new Product({
        name: req.body.name,
        size_M: req.body.size_M,
        size_L: req.body.size_L,
        size_XL:req.body.size_XL,
        prices: req.body.prices,
        quantity: req.body.quantity,
        createAt: req.body.createAt,
        description: req.body.description,
        categoryId: req.body.categoryId,
        status:req.body.status,
        image: req.file.path
    });
    console.log(createPro);
    try {
        const newpro = await createPro.save();
        console.log(newpro);
        res.status(200).json({
            message:"Create success",
            "product:":newpro,
        });
    } catch (error) {
        res.status(422).json({
            message:"Create fail"
        });
    }
    // // try {
    //     const newProducts = await createPro.save();
    //     // const createProduct_ = await createPro.save();
    //     // console.log(createProduct_);
    //     // console.log(createPro)
    //     console.log(newProducts);
    //     return res.status(200).json({
    //         message:"Create success",
    //        newProducts,
    //     });
    // } catch (error) {
    //     res.status(422).json({ message: "error" });
    // }
};
const getAllPro=async(req,res)=>{
    let listPro;
    try {
        listPro = await Product.find();
        console.log(listPro);
        return res.json({
            message: true,
            "ProductList": listPro
        });
    } catch (error) {
        res.json({
            message: "Error, try again"
        });
    }
}
const getProId=async(req,res)=>{
    const id = req.params.pid;
    let productss;
    try {
        productss = await Product.findById(id);
        console.log(productss)
        return res.json({
            message: true,
            "Product by Id": productss
        })
    } catch (error) {
        res.status(500).json({
            message: "Error"
        })
    }
}
const updateproductbyId=async(req,res)=>{
    const id = req.params.pid;
    const updatePro = {
        name: req.body.name,
        size_M: req.body.size_M,
        size_L: req.body.size_L,
        size_XL: req.body.size_XL,
        prices: req.body.prices,
        quantity: req.body.quantity,
        createAt: req.body.createAt,
        description: req.body.description,
        categoryId: req.body.categoryId,
        status: req.body.status,
        image: req.file.path
    }
    let products;
    try {
        products = await Product.findByIdAndUpdate(id, updatePro);
        return res.json({
            message: true,
            "Update successful": updatePro,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error"
        });
    }
}
const deletePro = async (req, res) => {
    const id = req.params.pid;
    let products;
    try {
        products = await Product.findByIdAndDelete(id);
        return res.json({
            message: true,
            "Delete successful": products,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error"
        });
    }
};
const getProByCate = async (req, res) => {
    const CateId = req.params.cid;
    let products;
    try {
        products = await Product.find({ categoryId: CateId });
        res.status(200).json({ products });

    } catch (err) {
        res.status(500).json({message:"Error"})
    }

    
};
module.exports = { createProduct, getAllPro, getProId, updateproductbyId, deletePro, getProByCate};