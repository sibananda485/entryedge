import { Router } from "express";
import {
  handleCreateSavedJob,
  handleDeleteSavedJob,
  handleGetSavedJob,
} from "../controllers/savedJob";
import { userMiddleWare } from "../middleware/userMiddleware";

export const savedJobRouter = Router();

savedJobRouter.get("/", [userMiddleWare], handleGetSavedJob);
savedJobRouter.post("/:id", [userMiddleWare], handleCreateSavedJob);
savedJobRouter.delete("/:id", [userMiddleWare], handleDeleteSavedJob);
