import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "..";
const SECRET = process.env.SECRET || "";

export const adminMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  } else {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, SECRET) as { id: number };
      const user = await prisma.user.findFirst({
        where: { id: decoded.id },
        select: {
          email: true,
          id: true,
          name: true,
          role: true,
          hashedPassword: true,
        },
      });
      if (!user) {
        res.status(401).json({ message: "Unauthorized" });
        return;
      } else {
        if (user.role == "ADMIN") {
          req.user = user;
          next();
          return;
        } else {
          res.status(401).json({ message: "Unauthorized" });
          return;
        }
      }
    } catch (error) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
  }
};
