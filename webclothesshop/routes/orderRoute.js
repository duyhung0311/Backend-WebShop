const express = require("express");
const { check } = require("express-validator");

const orderController = require("../controller/orderController");
const router = express.Router();

router.get("/", orderController.getAllOrder);
// router.get("/:oid", ordersController.getOrderById);
// router.get("/:uid", ordersController.getOrderByUserId);

router.post("/", orderController.createOrder);

// router.put("/:oid", ordersController.updateOrderById);

// router.delete("/:oid", ordersController.deleteOrderById);

module.exports = router;
