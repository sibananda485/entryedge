import { Request, Response } from "express";
import { prisma } from "..";
import { MessageSchema } from "../schemas/messages";

export const handleGetMessage = async (req: Request, res: Response) => {
  const user = req.user;
  const oppositeId = +req.params.id;
  const messages = await prisma.messages.findMany({
    where: {
      OR: [
        { senderId: user?.id, receiverId: oppositeId },
        { receiverId: user?.id, senderId: oppositeId },
      ],
    },
    orderBy: {
      createdAt: "asc",
    },
  });
  res.json(messages);
};

export const handleCreateMessage = async (req: Request, res: Response) => {
  try {
    MessageSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({ message: "Schema validation error", error });
    return;
  }
  const user = req.user;
  const ducation = await prisma.messages.findMany();
  res.status(201).json(ducation);
};
