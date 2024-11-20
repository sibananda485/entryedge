import { Router } from "express";
import {
  handleGetPersonal,
  handleUpdatePersonal,
} from "../controllers/personal";
import { userMiddleWare } from "../middleware/userMiddleware";

export const personalDataRouter = Router();

personalDataRouter.get("/", [userMiddleWare], handleGetPersonal);
personalDataRouter.post("/", [userMiddleWare], handleUpdatePersonal);
