import { Router } from "express";
import {
  handleCreateJobApplication,
  handleDeleteJobApplication,
  handleGetJobApplication,
  handleUpdateJobApplication
} from "../controllers/jobApplication";
import { userMiddleWare } from "../middleware/userMiddleware";
import { checkToken } from "../middleware/checkToken";
import { adminMiddleWare } from "../middleware/adminMiddleware";

export const jobApplicationRouter = Router();

jobApplicationRouter.get("/", [checkToken], handleGetJobApplication);
jobApplicationRouter.post("/:id", [userMiddleWare], handleCreateJobApplication);
jobApplicationRouter.patch(
  "/:id",
  [adminMiddleWare],
  handleUpdateJobApplication
);
jobApplicationRouter.delete(
  "/:id",
  [userMiddleWare],
  handleDeleteJobApplication
);
