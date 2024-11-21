import { Router } from "express";
import {
  handleCreateExperience,
  handleDeleteExperience,
  handleGetExperience,
  handleUpdateExperience,
} from "../controllers/experience";
import { userMiddleWare } from "../middleware/userMiddleware";

export const experienceRouter = Router();

experienceRouter.get("/", [userMiddleWare], handleGetExperience);
experienceRouter.post("/", [userMiddleWare], handleCreateExperience);
experienceRouter.patch("/:id", [userMiddleWare], handleUpdateExperience);
experienceRouter.delete("/:id", [userMiddleWare], handleDeleteExperience);
