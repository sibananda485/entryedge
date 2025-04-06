import { Router } from "express";
import {
  handleDeleteResume,
  handleGetResume,
  handleUploadResume,
} from "../controllers/resume";
import { userMiddleWare } from "../middleware/userMiddleware";

import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

export const resumeRouter = Router();

resumeRouter.get("/", [userMiddleWare], handleGetResume);
resumeRouter.post(
  "/",
  [userMiddleWare, upload.single("resume")],
  handleUploadResume
);
resumeRouter.delete("/:id", [userMiddleWare], handleDeleteResume);
