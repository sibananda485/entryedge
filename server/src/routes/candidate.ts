import { Router } from "express";
import { handleGetAllCandidate } from "../controllers/candidate";
import { adminMiddleWare } from "../middleware/adminMiddleware";

export const candidateRouter = Router();

candidateRouter.get("/", [adminMiddleWare], handleGetAllCandidate);
