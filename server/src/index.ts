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
import { createServer } from "node:http";
import { Server } from "socket.io";
import { candidateRouter } from "./routes/candidate";
import { messageRouter } from "./routes/message";
import os from "os";
import { resumeRouter } from "./routes/resume";

export const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// Function to get local IP address
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    const networkInterface = interfaces[name];
    // Check if the interface exists
    if (networkInterface) {
      for (const iface of networkInterface) {
        // Skip over non-IPv4 and internal (loopback) addresses
        if (iface.family === "IPv4" && !iface.internal) {
          return iface.address;
        }
      }
    }
  }
  return "0.0.0.0"; // Default fallback
}

const LOCAL_IP = getLocalIpAddress();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173", `http://${LOCAL_IP}:5173`], // Allow both localhost and local IP
    methods: ["GET", "POST"],
    credentials: true,
  },
});

io.on("connection", (socket) => {
  socket.on("joinRoom", (roomId) => {
    socket.join(roomId);
  });
  socket.on("sendMessage", async (data) => {
    socket.to(data.roomId).emit("receiveMessage", data);
  });
});

app.use(
  cors({
    origin: ["http://localhost:5173", `http://192.168.0.103:5173`], // Allow both localhost and local IP
    credentials: true,
  })
);
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
app.use("/api/candidate", candidateRouter);
app.use("/api/messages", messageRouter);
app.use("/api/resume", resumeRouter);

// Listen on all interfaces (0.0.0.0) instead of just localhost
// For TypeScript, we need to use a slightly different approach
server.listen(Number(PORT), () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log(`Server is also accessible at http://${LOCAL_IP}:${PORT}`);
});

export default server;
// Prisma client generated
