const express=require("express");
const { check } = require("express-validator");
const categoryController = require("../controller/categoryController");
const productController = require("../controller/productController");

const router=express.Router();
router.get('/',categoryController.getAllCategory);
router.get('/:cid',categoryController.getCategoryById);

router.post('/',
    [
        check('name').not().isEmpty()
    ]
    , categoryController.createCategory
);
router.delete('/:cid', categoryController.deleteCategoryById);
router.get("/Products/:cid", productController.getProductById);

router.put('/:cid',
[
    check('name').not().isEmpty()
]
,categoryController.updateCategoryById);
module.exports=router;