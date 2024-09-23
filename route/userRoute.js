const express = require("express");
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');


const user = require("../model/usersModel");
const {
  createUser,
  login,
  getAllUsers,
  getUserById,
  deleteUser,
  updateuser,
} = require("../controllers/userController");

// create users

router.post("/create-user", createUser);

router.post("/login", login);
router.get("/all-users",verifyToken, getAllUsers);
router.get("/user/:id",verifyToken, getUserById);
router.delete("/delete-user/:id",verifyToken, deleteUser);
router.put("/update-user/:id",verifyToken, updateuser);

module.exports = router;
