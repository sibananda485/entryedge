import { PrismaClient, User } from "@prisma/client";
import express, { Request, Response } from "express";
import { authRouter } from "./routes/auth";
import cors from "cors";
import { companyRouter } from "./routes/company";
import { personalDataRouter } from "./routes/personal";
import { educationRouter } from "./routes/education";
import { experienceRouter } from "./routes/experience";
import { jobRouter } from "./routes/job";
import { savedJobRouter } from "./routes/savedJob";
import { jobApplicationRouter } from "./routes/jobApplication";
export const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}


const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("JAY JAGANNATH");
});

app.use("/api/auth", authRouter);
app.use("/api/company", companyRouter);
app.use("/api/personal", personalDataRouter);
app.use("/api/education", educationRouter);
app.use("/api/experience", experienceRouter);
app.use("/api/job", jobRouter);
app.use("/api/saved-job", savedJobRouter);
app.use("/api/jobapplication", jobApplicationRouter);

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
