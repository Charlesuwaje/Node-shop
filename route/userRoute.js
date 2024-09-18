const express = require("express");
const router = express.Router();
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
router.get("/all-users", getAllUsers);
router.get("/user/:id", getUserById);
router.delete("/delete-user/:id", deleteUser);
router.put("/update-user/:id", updateuser);

module.exports = router;
