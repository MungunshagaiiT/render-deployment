import express from "express";
import {
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  saveUser,
  userGetEmail,
  getImageList,
} from "../controllers/users.controller.js";
import readDir from "../services/mern.services.js";
import { cloud } from "../controllers/users.controller.js";

import multer from "multer";

const router = express.Router();
router.get("/user", getUsers);
router.get("/user/:id", getUserById);
router.post("/useradd", saveUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.get("/finduserbyemail", userGetEmail);
router.get("/getimagelist", getImageList);
// router.post("/upload-avatar", updateUser);

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post("/profile-upload", upload.single("file"), (req, res, next) => {
  const file_names = readDir();
  if (!req.file) {
    console.log("No file received");
    return res.send({
      success: false,
    });
  } else {
    console.log("file received", req.file.filename);
    return res.status(201).json({
      message: "Amjilttai upload hiigdlee",
      filename: req.file.filename,
      file_names: file_names,
    });
    // return res.send(req.file);
  }
});

router.post("/upload", upload.single("file"), async (req, res) => {
  const up = await cloud.v2.uploader.upload(req.file.path, {
    public_id: "olympic_flag",
  });
  console.log("amjilttai yavlaaa");
  const url = cloud.url("olympic_flag", {
    widyj: 100,
    height: 150,
    Crop: "fill",
  });
  console.log("url:", url);
  const url_list = await cloud.api.resources(
    { type: "upload", prefix: "olympic_flag/" },
    function (error, result) {
      console.log(error, result);
    }
  );
  const url_list_img = url_list.resources.map((item) => {
    return item.url;
  });

  return res.json({
    success: true,
    file: up.secure_url,
    url_list: url_list_img,
  });
});
export default router;
