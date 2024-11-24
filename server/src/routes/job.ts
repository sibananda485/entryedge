import { Router } from "express";
import {
  handleCreateJob,
  handleDeleteJob,
  handleGetJob,
  handleGetJobById,
  handleUpdateJob,
} from "../controllers/job";
import { checkToken } from "../middleware/checkToken";
import { adminMiddleWare } from "../middleware/adminMiddleware";

export const jobRouter = Router();

jobRouter.get("/", [checkToken], handleGetJob);
jobRouter.get("/:id", [checkToken], handleGetJobById);
jobRouter.post("/", [adminMiddleWare], handleCreateJob);
jobRouter.patch("/:id", [adminMiddleWare], handleUpdateJob);
jobRouter.delete("/:id", [adminMiddleWare], handleDeleteJob);
