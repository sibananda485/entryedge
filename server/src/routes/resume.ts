import { Router } from "express";
import { handleDeleteResume, handleUploadResume } from "../controllers/resume";
import { userMiddleWare } from "../middleware/userMiddleware";

export const resumeRouter = Router();

// resumeRouter.get("/", handleGetResume);
resumeRouter.post("/", [userMiddleWare], handleUploadResume);
resumeRouter.delete("/", [userMiddleWare], handleDeleteResume);
