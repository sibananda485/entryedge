import { Router } from "express";
import {
  handleCreateJobApplication,
  handleDeleteJobApplication,
  handleGetJobApplication,
} from "../controllers/jobApplication";
import { userMiddleWare } from "../middleware/userMiddleware";

export const jobApplicationRouter = Router();

jobApplicationRouter.get("/", [userMiddleWare], handleGetJobApplication);
jobApplicationRouter.post("/:id", [userMiddleWare], handleCreateJobApplication);
jobApplicationRouter.delete(
  "/:id",
  [userMiddleWare],
  handleDeleteJobApplication
);
