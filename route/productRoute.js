const express = require("express");
// const app = express();
const router = express.Router();
const product = require("../model/productModel");
const {createProduct,getProduct,getproducrById,updateProduct,deleteProduct}=  require("../controllers/productController")

router.get("/", (req, res) => {
  res.send("hello world chaxo");
});
router.post("/product",createProduct);
router.get("/get-product",getProduct);
router.get("/get-product/:id",getproducrById);
// update product
router.put("/update-product/:id",updateProduct);

router.delete("/delete-product/:id",deleteProduct);
module.exports = router;
