const express = require("express");
const mongoose = require("mongoose");
const Order = require("../models/order");
// const product = require("../models/product");
// const Product = require("../models/product");

const createOrder = async (req, res) => {
    const createorder = new Order({
        customerName: req.body.customerName,
        customerAddress: req.body.customerAddress,
        customerPhone: req.body.customerPhone,
        totalPrices: req.body.totalPrices,
        status: req.body.status,
        note: req.body.status,
        createAt: req.body.createAt,
        doneAt: req.body.doneAt,
        productlist: req.body.productlist,
        // userAddress: req.body.userAddress,

        userId: req.body.userId,
    });
    console.log(req.body.productlist)
    console.log(req.body);
    try {
        const newOrder = await createorder.save();
        console.log(newOrder);
        return res.status(200).json({
            newOrder
        })
    } catch (error) {
        res.status(500).json({
            message: "Fail"
        })
    }
    // await newOrder.save();

    //     console.log(neworder);
    //     await neworder.save();
    //     return res.status(200).json({
    //         message: "Create order success",
    //         abc: neworder,

    //     })
    // } catch (error) {
    //     res.status(500).json({
    //         message: "Error"
    //     })

    // }

}
const getAllOrder = async (req, res) => {
    let listOrder;
    try {
        listOrder = await Order.find();
        console.log(listOrder);
        return res.json({
            message: true,
            "Item created": listOrder
        });
    } catch (error) {
        res.json({
            message: "Error, try again"
        });
    }
}
const getOrderbyUserId = async (req, res) => {
    let orders;
    const userId = req.params.uid;
    try {
        orders = await Order.find({ userId: userId });
        res.status(200).json({
            message: "Get Order By User successfully",
            orders,
        });
    } catch (error) {
        res.status(500).json({
            message: "Fail"
        })
    }
}
const updatebyId = async (req, res) => {
    const OrderId = req.params.oid;
    const update = {

        status: req.body.status,
        doneAt:req.body.doneAt,
    };
    console.log(update);
    let orders;
    orders = await Order.findByIdAndUpdate(OrderId, update);
    console.log(orders);
    res.status(200).json({ orders: update })

}
const deleteOrderbyId = async (req, res) => {
    const id = req.params.oid;
    let orders;
    try {
        orders = await Order.findByIdAndDelete(id);
        return res.json({
            message: true,
            "Delete successful": orders,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error"
        });
    }
}
const getbyId = async (req, res) => {
    const orderId = req.params.oid;
    // console.log(_id);
    let orders_get;
    try {
        orders_get = await Order.findById(orderId);
        console.log(orders_get)
        res.status(200).json({
            message: "Get Order by Id Order",
            orders_get,
        });
    } catch (error) {
        res.status(500).json({
            message: "Error"
        });
    }
}
module.exports = { createOrder, getAllOrder, getOrderbyUserId, updatebyId, deleteOrderbyId, getbyId };
