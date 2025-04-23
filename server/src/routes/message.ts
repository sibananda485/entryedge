import { Router } from "express";
import { checkToken } from "../middleware/checkToken";
import {
  handleGetMessage,
  handleCreateMessage,
  getChats,
} from "../controllers/message";

export const messageRouter = Router();

messageRouter.get("/", [checkToken], getChats);
messageRouter.get("/:id", [checkToken], handleGetMessage);
messageRouter.post("/", [checkToken], handleCreateMessage);
