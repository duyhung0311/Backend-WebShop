const mongoose = require("mongoose")
// const Product = require("../models/product");
const { validationResult } = require("express-validator");
const Product = require("../models/product");
const HttpError = require("./../error/error");
// const HttpError = require('../error/error')
const createProduct = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        const error = new HttpError("Invalid Input! Pls check your data", 400);
        return next(error);
    }

    let imagesCurrent;
    if (typeof req.file !== "undefined") {
        imagesCurrent = req.file.path;
    } else imagesCurrent = null;
    if (imagesCurrent === null) {
        const createProduct = {
            name: req.body.name,
            size:req.body.size,
            prices: req.body.prices,
            quantity: req.body.quantity,
            status: req.body.status,
            createAt: req.body.createAt,
            description: req.body.description,
            categoryId: req.body.categoryId,
        };
        console.log(createProduct);
        try {
            const newProducts = new Product(createProduct);
            await newProducts.save();
            console.log(newProducts);
            res.status(200).json({
                message: "Create success",
                newProducts,
            });
        } catch (error) {
            if (error.name === "MongoError" && error.code === 11000) {
                // Duplicate username
                return res.status(422).send({ message: "Product already exist!" });
            }
            return res.status(422).send(error);
        }
    } else {
        const createProduct = {
            name: req.body.name,
            size:req.body.size,
            prices: req.body.prices,
            quantity: req.body.quantity,
            status: req.body.status,
            createAt: req.body.createAt,
            description: req.body.description,
            imagesProduct: imagesCurrent,
            categoryId: req.body.categoryId,
        };
        console.log(createProduct);
        try {
            const newProducts = new Product(createProduct);
            await newProducts.save();
            console.log(newProducts);
            res.status(200).json({
                message: "Create success",
                newProducts,
            });
        } catch (error) {
            if (error.name === "MongoError" && error.code === 11000) {
                // Duplicate username
                return res.status(422).send({ message: "Product already exist!" });
            }
            return res.status(422).send(error);
        }
    }
};

const getAllProduct = async (req, res, next) => {
    let products;
    try {
        products= await Product.find();
        console.log(products);
    } catch (err) {
        const error = new HttpError('Something went wrong, could not find any product', 500);
        return next(error);
    };

    if (!products) {
        const error = new HttpError('Could not find any product', 404);
        return next(error);
    }
    res.status(200).json({ products });

};
const getProductById = async (req, res, next) => {
    const ProductId = req.params.cid;
    let products;
    try {
        products = await Product.findById(ProductId);
    } catch (err) {
        const error = new HttpError(
            'Something went wrong, could not find a product.', 500);
        return next(error);
    }

    if (!products) {
        const error = new HttpError(
            'Could not find a product for the provided id.', 404);
        return next(error);
    }
    res.json({ products: products.toObject({ getters: true }) });
};
const updateProductById = async (req, res, next) => {
    const errors = validationResult(req);
    const ProId = req.params.pid;
    if (!errors.isEmpty()) {
        console.log(errors);
        const error = new HttpError("Invalid Input! Pls check your data", 400);
        return next(error);
    }
    let imagesCurrent;
    if (typeof req.file !== "undefined") {
        imagesCurrent = req.file.path;
    } else imagesCurrent = null;
    if (imagesCurrent === null) {
        const updatedProduct = {
            name: req.body.name,
            size: req.body.size,
            prices: req.body.prices,
            quantity: req.body.quantity,
            status: req.body.status,
            createAt: req.body.createAt,
            description: req.body.description,
        };
        try {
            let products;
            products = await Product.findByIdAndUpdate(ProId, updatedProduct);
            console.log(products);
            return res.status(200).json({
                message: "Update Product success",
                products: updatedProduct,
            });
        } catch (error) {
            if (error.name === "MongoError" && error.code === 11000) {
                // Duplicate username
                return res.status(422).send({ message: "Product already exist!" });
            }
            return res.status(422).send(error);
        }
    } else {
        const updatedProduct = {
            
            name: req.body.name,
            size: req.body.size,
            prices: req.body.prices,
            quantity: req.body.quantity,
            status: req.body.status,
            createAt: req.body.createAt,
            description: req.body.description,
            imagesProduct: imagesCurrent,
        };
        try {
            let products;
            products = await Product.findByIdAndUpdate(ProId, updatedProduct);
            console.log(products);
            return res.status(200).json({
                message: "Update Product success",
                products: updatedProduct,
            });
        } catch (error) {
            if (error.name === "MongoError" && error.code === 11000) {
                // Duplicate username
                return res.status(422).send({ message: "Product already exist!" });
            }
            return res.status(422).send(error);
        }
    }
};
const deleteProductById = async (req, res, next) => {
    const ProductId = req.params.cid;
    let products;
    try {
        products = await Product.findByIdAndDelete(ProductId);
    }
    catch (err) {
        const error = new HttpError('Something went wrong, can not delete', 500);
        return next(error);
    }
    if (!products) {
        const error = new HttpError('Could not find any product', 404);
        return next(error);
    }
    res.status(200).json({ message: 'Deleted Product successfull' });
}
module.exports = { createProduct,getAllProduct,getProductById,updateProductById,deleteProductById};
