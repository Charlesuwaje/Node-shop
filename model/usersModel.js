const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema(
  { 
    email: {
      type: String,
      required: [true, "email required"],
      unique: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      minlength: [8, "password must be at least 8 characters"],
      required: [true, "password required"],
    },
    first_name: {
      type: String,
      required: [true, "first name required"],
    },
    last_name: {
      type: String,
      required: [true, "last name required"],
    },
    phone_number: {
      type: String,
      required: [true, "phone number required"],
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
      return next();
    }
  
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  });
// const Schema = mongoose.Schema;
const user = mongoose.model("user", userSchema);
module.exports = user;
