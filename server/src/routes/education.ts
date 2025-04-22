import { Router } from "express";
import {
  handleCreateEducation,
  handleDeleteEducation,
  handleGetEducation,
  handleUpdateEducation,
  handleGetEducationById
} from "../controllers/education";
import { userMiddleWare } from "../middleware/userMiddleware";
import { adminMiddleWare } from "../middleware/adminMiddleware";

export const educationRouter = Router();

educationRouter.get("/", [userMiddleWare], handleGetEducation);
educationRouter.get("/:id", [adminMiddleWare], handleGetEducationById);
educationRouter.post("/", [userMiddleWare], handleCreateEducation);
educationRouter.patch("/:id", [userMiddleWare], handleUpdateEducation);
educationRouter.delete("/:id", [userMiddleWare], handleDeleteEducation);
