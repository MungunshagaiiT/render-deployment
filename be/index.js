import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./routes/user.routes.js";
import dotenv from "dotenv";

const app = express();
dotenv.config();

mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
const db = mongoose.connection;
app.use(cors());
app.use(express.json());
app.use("/profile-upload", express.static("uploads"));
app.use(router);

app.listen(process.env.PORT, () => console.log("Server up and running..."));
