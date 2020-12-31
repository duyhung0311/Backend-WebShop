const express = require("express");
const categoriesController = require("../controller/categoriesController");
const router = express.Router();
router.post("/",categoriesController.createCategory);
router.get("/", categoriesController.getlistCategory);
router.get("/:cid", categoriesController.getCateByID);
router.patch("/:cid", categoriesController.updateCate);
router.delete("/:cid", categoriesController.deleteCate);

module.exports = router;
