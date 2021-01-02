const express = require("express");
const productsController = require("../controller/productController");
const multer = require ("multer");
// const upload=multer({dest:'uploads/imageProduct'});



//Upload image
const { v1: uuid } = require("uuid");

const MINE_TYPE_MAP = {
    "image/png": "png",
    "image/jpeg": "jpeg",
    "image/jpg": "jpg",
};

const upload = multer({
    limits: 50000,
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "uploads/imageProduct");
        },
        filename: (req, file, cb) => {
            const ext = MINE_TYPE_MAP[file.mimetype];
            cb(null, uuid() + "." + ext);
        },
    }),
    fileFilter: (req, file, cb) => {
        const isValid = !!MINE_TYPE_MAP[file.mimetype];
        let error = isValid ? null : new Error("Invalid mimetype!");
        cb(error, isValid);
    },
});





const router = express.Router();
router.post("/", upload.single('image'),
    // fileUploadProduct.single("imagesProduct"),
    productsController.createProduct);
router.get("/",productsController.getAllPro);
router.get("/:pid", productsController.getProId);
router.put("/:pid", upload.single('image'),productsController.updateproductbyId)
router.delete("/:pid", productsController.deletePro)

module.exports = router;