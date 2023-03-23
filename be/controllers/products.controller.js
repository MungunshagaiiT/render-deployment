import User from "../models/user.model.js";
import multer from "multer";
import { uuid } from "uuidv4";
import readDir from "../services/mern.services.js";
import cloudinary from "cloudinary";
import dotenv from "dotenv";

export const getUsers = async (req, res) => {
  try {
    const users = await User.find(
      {},
      { id: 1, firstname: 1, lastname: 1, email: 1, phonenumber: 1, gender: 1 }
    );
    res.json(users);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

export const userGetEmail = async (req, res) => {
  const userEmail = req.query.email;
  const found = await User.findByUserEmail(userEmail);
  res.json(found);
};

export const getUserById = async (req, res) => {
  try {
    const user = await User.findOne({ id: req.params.id });
    res.json(user);
  } catch (e) {
    res.status(404).json({ message: e });
  }
};

export const saveUser = async (req, res) => {
  const user = new User({ id: uuid(), ...req.body });
  const insertUser = await user.save();
  res.status(201).json(insertUser);
};

// export const saveProfile = async (req, res) => {};

export const updateUser = async (req, res) => {
  try {
    const updateUser = await User.updateOne(
      { id: req.params.id },
      { $set: req.body }
    );
    res.status(200).json(updateUser);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deleteUser = await User.deleteOne({ _id: req.params.id });
    res.status(200).json(deleteUser);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

export const getImageList = async (req, res) => {
  try {
    const file_names = readDir();
    res.status(200).json({ file_names: file_names });
  } catch (error) {
    res.status(400).json({ error: "aldaa garlaa..." });
    console.log(error);
  }
};

// export const saveImageCloudinary = (req, res) => {
//   try {
//     cloudinary.config({
//       cloud_name: "dhmsqdgsd",
//       api_key: "124551293337585",
//       api_secret: "Co0AC8mZ5cVf5lZRWREQwxHgxrY",
//     });
//   } catch (error) {}
// };

export const cloud = cloudinary;
cloud.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
