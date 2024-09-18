const express = require("express");
// const userController = require('../controllers/userController');
const user = require("../model/usersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const asyncHandler = require('express-async-handler')
module.exports = router;

const createUser = asyncHandler (async (req, res) => {
  try {
    const createuser = await user.create(req.body);
    res.status(201).json(["user created sucessfully ", createuser]);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    // console.log(error.message);
    // res.status(500).json(error.message);
  }
});
const login = asyncHandler(async (req, res) => {
  try {
    const { email, password, id } = req.body;

    const User = await user.findOne({ email });
    if (!User) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id.toString() }, "your_jwt_secret", {
      expiresIn: "1h", // Token expiration time
    });

    res.status(200).json({ token });
  } catch (error) {
    // console.log(error.message);
    res.status(500);
    throw new Error(error.message);
    // res.status(500).json({ message: error.message });
  }
});
const getAllUsers = asyncHandler (async (req, res) => {
  try {
    const Allusers = await user.find({});
    res
      .status(200)
      .json({ message: `all users sucessfully fetched.`, Allusers });
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    // console.log(error.message);
    // res.status(500).json(error.message);
  }
});
const getUserById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const usersByid = await user.findById(id);
    if (!usersByid) {
      return res.status(404).json({ message: `user id  ${id} not found` });
    }
    res.status(200).json(["single user featched sucessfully", usersByid]);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    // console.log(error.message);
    // res.status(500).json(error.message);
  }
});
const deleteUser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const Users = await user.findByIdAndDelete(id);
    if (!Users) {
      return res.status(404).json({ message: `user id ${id} not found` });
    }
    res.status(200).json(["user deleted sucessfully.", Users]);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    // console.log(error.message);
    // res.status(500).json({ message:error.message});
  }
});

const updateuser = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const Update = await user.findByIdAndUpdate(id, req.body);
    if (!Update) {
      return res
        .status(404)
        .json({ message: `cant update user id ${id}not found` });
    }
    const Updateuser = await user.findById(id);
    res.status(201).json(["user updated sucessfully", Updateuser]);
  } catch (error) {
    res.status(500);
    throw new Error(error.message);
    // console.log(error.message);
    // res.status(500).json({ message: error.message });
  }
});
module.exports = {
  createUser,
  login,
  getAllUsers,
  getUserById,
  deleteUser,
  updateuser,
};
