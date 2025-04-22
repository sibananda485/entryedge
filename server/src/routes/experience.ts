import { Router } from "express";
import {
  handleCreateExperience,
  handleDeleteExperience,
  handleGetExperience,
  handleUpdateExperience,
  handleGetExperienceById,
} from "../controllers/experience";
import { userMiddleWare } from "../middleware/userMiddleware";
import { adminMiddleWare } from "../middleware/adminMiddleware";

export const experienceRouter = Router();

experienceRouter.get("/", [userMiddleWare], handleGetExperience);
experienceRouter.get("/:id", [adminMiddleWare], handleGetExperienceById);
experienceRouter.post("/", [userMiddleWare], handleCreateExperience);
experienceRouter.patch("/:id", [userMiddleWare], handleUpdateExperience);
experienceRouter.delete("/:id", [userMiddleWare], handleDeleteExperience);
