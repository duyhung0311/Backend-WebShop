const express = require("express");
const userController = require("../controller/userController");
const { check } = require("express-validator");

const router=express.Router()
router.post(
    '/register',
    userController.register
);
router.post("/login", userController.login);
router.get("/confirmation/:token", userController.getConfirmation);
router.put("/lock/:uid", userController.lockUser);
router.get("/", userController.getAllUsers);
router.get("/:uid", userController.getUserById);

module.exports=router;