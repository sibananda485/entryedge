import { Router } from "express";
import {
  handleGetAllCompany,
  handleGetCompany,
  handleUpdateCompany,
} from "../controllers/company";
import { adminMiddleWare } from "../middleware/adminMiddleware";
import { userMiddleWare } from "../middleware/userMiddleware";

export const companyRouter = Router();

companyRouter.get("/", [adminMiddleWare], handleGetCompany);
companyRouter.get("/all", [userMiddleWare], handleGetAllCompany);
companyRouter.post("/", [adminMiddleWare], handleUpdateCompany);
