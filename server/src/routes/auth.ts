import { Router } from "express";
import { handleLogin, handleSignup } from "../controllers/auth";

export const authRouter = Router();

authRouter.post("/login", handleLogin);
authRouter.post("/signup", handleSignup);
