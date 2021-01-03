const express = require("express");
const router = express.Router();
const orderController = require('./../controller/orderController')
router.post("/",orderController.createOrder);
router.get("/",orderController.getAllOrder);
router.get("/:oid", orderController.getbyId);

router.get("/userid/:uid",orderController.getOrderbyUserId);

router.put("/:oid", orderController.updatebyId);
router.delete("/:oid",orderController.deleteOrderbyId);
module.exports=router