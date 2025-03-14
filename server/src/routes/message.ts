import { Router } from "express";
import { checkToken } from "../middleware/checkToken";
import { handleGetMessage } from "../controllers/message";

export const messageRouter = Router();

messageRouter.get("/:id", [checkToken], handleGetMessage);
