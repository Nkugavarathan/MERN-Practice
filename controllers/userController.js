import jwt from "jsonwebtoken"

import bcrypt from "bcryptjs"
import asyncHandler from "express-async-handler"
import User from "../model/userModel.js"

// This function handles user registration
export const registerUser = asyncHandler(async (req, res) => {
  // Get user details from the request
  const { name, email, password } = req.body

  // Check if all fields are provided
  if (!name || !email || !password) {
    res.status(400) // Bad request
    throw new Error("Please fill all the fields")
  }

  // Check if the user already exists
  const userExist = await User.findOne({ email })
  if (userExist) {
    res.status(400)
    throw new Error("User already exists")
  }

  // Hash the password before saving
  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(password, salt)

  // Create a new user in the database
  const user = await User.create({
    name,
    email,
    password: hashPassword,
    token: generateToken(user._id),
  })

  // Send back user info if successful
  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error("Invalid user data")
  }
})

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error("invalid")
  }

  res.json({ message: "Login user" })
})

export const getMe = asyncHandler(async (req, res) => {
  res.json({ message: "user data display" })
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  })
}
