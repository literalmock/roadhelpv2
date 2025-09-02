import User from "../models/user.models.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ENVVARS from "../config/envVars.js";
import { genTokenAndSetCookie } from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { email, password, username } = req.body;

    const user = new User({
      email,
      password,
      username
    });

    if(!user || !password || !username){
        res.status(400).json({
            success: false,
            message: "All fields are required"
        });
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
        return;
    }

    const existingUserByEmail = await User.findOne({ email:email });
    console.log("eube" + existingUserByEmail);
    if (existingUserByEmail) {
        res.status(400).json({
            success: false,
            message: "Email is already in use"
        });
        return;
    }

    const existingUserByUsername = await User.findOne({ username:username });

    if (existingUserByUsername) {
        res.status(400).json({
            success: false,
            message: "Username is already taken"
        });
        return;
    }

    // await user.save();
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      username: user.username,
      email: user.email,
      password: hashedPassword
    });

   await newUser.save();

   genTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      success: true,
      user:{
        ...newUser._doc,
        password: undefined
      },
      message: "User registered successfully"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "User registration failed",
      error: error.message
    });
  }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send('Email and password are required');
    }
    const user = await User.findOne({ email });
  if (!user) {
      return res.status(401).send({success:false,message:'Invalid credentials'});
  } 
  // Check if the password matches
  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
      return res.status(401).send({success:false,message:'Invalid credentials'});
  }


  //jwt-setup and cookie setting
  const token = genTokenAndSetCookie(user, res);

  res.send({ success: true, user:{
        ...user._doc,
        password: undefined
      }, message: 'Login successful' , token  });
  
};


export const logout = async (req, res) => {
try {
  res.clearCookie('jwt-roadhelp',{
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",   
  });
  res.send({ success: true, message: 'Logout successful' });
} catch (error) {
  res.status(500).send({ success: false, message: 'Logout failed', error: error.message });
}
};
