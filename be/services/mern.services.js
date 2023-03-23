import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";

const readDir = () => {
  const readdir = fs.readdirSync("./uploads/");
  return readdir;
};
export default readDir;
