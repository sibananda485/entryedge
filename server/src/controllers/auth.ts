import { Request, Response } from "express";
import { LoginSchema, SignupSchema } from "../schemas/auth";
import { prisma } from "..";
import { z } from "zod";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const SECRET = process.env.SECRET || "";

export const handleLogin = async (req: Request, res: Response) => {
  try {
    LoginSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({ message: "Schema validation error", error });
    return;
  }
  const { email, password } = req.body as z.infer<typeof LoginSchema>;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  if (!user) {
    res.status(401).json({ message: "Invalid email or password" });
    return;
  } else {
    const isValidPassword = await bcrypt.compare(password, user.hashedPassword);
    if (!isValidPassword) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    } else {
      const token = jwt.sign({ id: user.id }, SECRET);
      res.json({
        token,
        message: "Login successfully",
        user,
      });
    }
  }
};
export const handleSignup = async (req: Request, res: Response) => {
  try {
    SignupSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({ message: "Schema validation error", error });
    return;
  }
  const { email, password, name } = req.body as z.infer<typeof SignupSchema>;

  const isUserExists = await prisma.user.findFirst({
    where: {
      email,
    },
  });
  if (isUserExists) {
    res.status(401).json({ message: "User Already exists" });
    return;
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: { email, hashedPassword, name },
    });
    res.json(user);
  }
};
