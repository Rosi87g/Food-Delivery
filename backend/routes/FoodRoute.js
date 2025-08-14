import express from "express";
import { addFood, listFood, removeFood } from "../controllers/FoodController.js";
import multer from "multer";
import fs from "fs";

const foodRouter = express.Router();

// Ensure uploads directory exists
const uploadDir = "uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Multer Storage Engine
const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

// File type filter
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });

// ✅ Route Definitions
foodRouter.post("/add", upload.single("image"), (req, res, next) => {
  addFood(req, res).catch(next);
});

foodRouter.post("/remove", (req, res, next) => {
  removeFood(req, res).catch(next);
});

foodRouter.get("/list", (req, res, next) => {
  listFood(req, res).catch(next);
});

export default foodRouter;
