const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      set: (value) => value.replace(/\s+/g, " "),
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      set: (value) => value.replace(/\s+/g, ""),
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Email is invalid.");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minLength: [6, "Password must be longer than 6 characters."],
      validate(value) {
        if (value.toLowerCase().includes("password")) {
          throw new Error('Password cannot contain the word "password".');
        }
      },
    },
    userType: {
      type: String,
      default: "User", //"Admin"
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    avatar: {
      type: Buffer,
    },
  },
  {
    timestamps: true,
  }
);
