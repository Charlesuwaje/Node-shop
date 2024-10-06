const express = require("express");
// const product = require('../controllers/product');
const product = require("../model/productModel");
const router = express.Router();
const asyncHandler = require('express-async-handler')
module.exports = router;

const createProduct = asyncHandler(async (req, res) => {
  try {
    const Product = await product.create(req.body);
    res.status(201).json(["product created sucessfully", Product]);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    //   console.log(error.message);
    //   res.status(500).json({ message: error.message });
  }
});

// const getProduct = asyncHandler(async (req, res) => {
//   try {
//     const { search } = req.query;

//     let query = {};

//     if (search) {
//       query = {
//         $or: [
//           { name: { $regex: search, $options: "i" } },
//           { description: { $regex: search, $options: "i" } },
//           { category: { $regex: search, $options: "i" } },
//           { price: { $regex: search, $options: "i" } },
//           { quantity: { $regex: search, $options: "i" } },


//         ],
//       };
//     }
//     const Products = await product.find({});
//     res.status(200).json(["product featched sucessfully", Products]);
//   } catch (error) {
//     res.status(500);
//     throw new Error(error.message);
//     //   console.log(error.message);
//     //   res.status(500).json({ message: error.message });
//   }
// });

const getProduct = asyncHandler(async (req, res) => {
  try {
    const { search } = req.query;

    let query = {};

    if (search) {
      const searchNumber = parseFloat(search);

      query = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { description: { $regex: search, $options: "i" } },
          { category: { $regex: search, $options: "i" } },
          ...(isNaN(searchNumber) ? [] : [
            { price: searchNumber },
            { quantity: searchNumber }
          ])
        ],
      };
    }

    const Products = await product.find(query);
    res.status(200).json(["Product fetched successfully", Products]);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
  }
});


const getproducrById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    //   const Product = await product.findById(req.params.id);
    const Product = await product.findById(id);
    if (!Product) {
      return res.status(404).json({ message: `product id ${id} not found  ` });
    }
    res.status(200).json(["single product featched sucessfully", Product]);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    //   console.log(error.message);
    //   res.status(500).json({ message: error.message });
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    // const Product = await product.findById(req.params.id);
    const Product = await product.findByIdAndUpdate(id, req.body);
    if (!Product) {
      return res
        .status(404)
        .json({ message: `some thing went wrong id ${id} not found` });
    }
    const UpdatedProduct = await product.findById(id);
    res.status(201).json(["Product updated sucessfully", UpdatedProduct]);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    //   console.log(error.message);
    //   res.status(500).json({ message: error.message });
  }
});
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const Product = await product.findByIdAndDelete(id);
    if (!product) {
      return res.status(404).json({ mesaage: `Product id ${id} not found ` });
    }
    res.status(200).json(["Product deleted sucessfully", Product]);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    // console.log(error.message);
    // res.status(500).json({message:error.message});
  }
});
module.exports = {
  createProduct,
  getProduct,
  getproducrById,
  updateProduct,
  deleteProduct,
};
