const express = require("express");
const { check } = require("express-validator");
const productController = require("./../controller/productController");
const {fileUploadProduct} = require('./../middleware/upload');

const router = express.Router();
router.get('/', productController.getAllProduct);
router.get('/:cid', productController.getProductById);

router.post('/',
    fileUploadProduct.single("imageProduct"),
    [
        check('name').not().isEmpty()
    ]
    , productController.createProduct
);
router.delete('/:cid', productController.deleteProductById);
router.put('/:pid',
    fileUploadProduct.single("imageProduct"),
    [
        check('name').not().isEmpty()
    ]
    , productController.updateProductById);
module.exports = router;