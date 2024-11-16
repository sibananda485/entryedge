import { Router } from "express";
import { handleGetCompany, handleUpdateCompany } from "../controllers/company";
import { adminMiddleWare } from "../middleware/adminMiddleware";

export const companyRouter = Router();

companyRouter.get("/", [adminMiddleWare], handleGetCompany);
companyRouter.post("/", [adminMiddleWare], handleUpdateCompany);
