const express = require("express");
const router = express.Router();
const usersController=require('./../controller/userController')
router.post("/register/admin", usersController.Admin);
router.post("/login/admin", usersController.loginAdmin);
router.post("/register",usersController.register);
router.post("/login",usersController.login);
router.get("/", usersController.getListUser);
router.get("/:uid", usersController.getUserbyId);
// router.put("/:uid", usersController.updateUserbyId);

module.exports=router;