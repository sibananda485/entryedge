import { Router } from "express";
import {
  handleGetPersonal,
  handleUpdatePersonal,
  handleGetPersonalById,
} from "../controllers/personal";
import { userMiddleWare } from "../middleware/userMiddleware";
import { adminMiddleWare } from "../middleware/adminMiddleware";

export const personalDataRouter = Router();

personalDataRouter.get("/", [userMiddleWare], handleGetPersonal);
personalDataRouter.get("/:id", [adminMiddleWare], handleGetPersonalById);
personalDataRouter.post("/", [userMiddleWare], handleUpdatePersonal);
