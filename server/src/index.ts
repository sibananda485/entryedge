import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";
import { authRouter } from "./routes/auth";
import cors from "cors";

export const prisma = new PrismaClient();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use("/api/auth", authRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
