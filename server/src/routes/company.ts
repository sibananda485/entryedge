import { Router } from "express";
import {
  handleCreateCompany,
  handleGetCompany,
  handleUpdateCompany,
} from "../controllers/company";
import { userMiddleWare } from "../middleware/userMiddleware";

export const companyRouter = Router();

companyRouter.get("/", [userMiddleWare], handleGetCompany);
companyRouter.post("/", [userMiddleWare], handleCreateCompany);
companyRouter.patch("/", [userMiddleWare], handleUpdateCompany);
