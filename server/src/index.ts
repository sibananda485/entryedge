import { PrismaClient, User } from "@prisma/client";
import express, { Request, Response } from "express";
import { authRouter } from "./routes/auth";
import cors from "cors";
import { companyRouter } from "./routes/company";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const prisma = new PrismaClient();

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("JAY JAGANNATH");
});
app.use("/api/auth", authRouter);
app.use("/api/company", companyRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
