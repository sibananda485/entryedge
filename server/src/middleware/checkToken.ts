import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "..";
const SECRET = process.env.SECRET || "";

export const checkToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    next();
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
        next();
        return;
      } else {
        req.user = user;
        next();
        return;
      }
    } catch (error) {
      next();
      return;
    }
  }
};
