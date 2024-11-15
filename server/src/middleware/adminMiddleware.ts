import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "..";
const SECRET = process.env.SECRET || "";

export const adminMiddleWare = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  } else {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, SECRET) as { id: number };
    const user = await prisma.user.findFirst({
      where: { id: decoded.id },
      select: { email: true, id: true, name: true, role: true },
    });
    if (!user) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    } else {
      if (user.role == "ADMIN") {
        req.body.user = user;
        next();
        return;
      } else {
        res.status(401).json({ message: "Unauthorized" });
        return;
      }
    }
  }
};
