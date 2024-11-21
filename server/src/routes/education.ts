import { Router } from "express";
import {
  handleCreateEducation,
  handleDeleteEducation,
  handleGetEducation,
  handleUpdateEducation,
} from "../controllers/education";
import { userMiddleWare } from "../middleware/userMiddleware";

export const educationRouter = Router();

educationRouter.get("/", [userMiddleWare], handleGetEducation);
educationRouter.post("/", [userMiddleWare], handleCreateEducation);
educationRouter.patch("/:id", [userMiddleWare], handleUpdateEducation);
educationRouter.delete("/:id", [userMiddleWare], handleDeleteEducation);
