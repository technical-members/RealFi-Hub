// server/routes/productRoutes.js
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth");
const productController = require("../controllers/product");

router.post("/create", productController.createProduct);

router.get("/getAll", productController.getAllProducts);
router.get("get/property", productController.getProperty);

router.post("/:productId/place-bid", productController.placeBid);
router.get("/:productId/bid-history", productController.getBidHistory);

// router.get('/inventory', productController.getAllProducts);
router.put("/update/:productId", productController.updateProduct);

module.exports = router;
