const express = require("express");
const verifyToken = require('../middleware/authMiddleware');

// const app = express();
const router = express.Router();
const product = require("../model/productModel");
const {createProduct,getProduct,getproducrById,updateProduct,deleteProduct}=  require("../controllers/productController")

router.get("/", (req, res) => {
  res.send("hello world chaxo");
});
router.post("/product",verifyToken,createProduct);
router.get("/get-product",verifyToken,getProduct);
router.get("/get-product/:id",verifyToken,getproducrById);
// update product
router.put("/update-product/:id",verifyToken,updateProduct);

router.delete("/delete-product/:id",verifyToken,deleteProduct);
module.exports = router;
