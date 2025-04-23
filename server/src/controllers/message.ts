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
  const message = await prisma.messages.create({
    data: req.body,
  });
  res.status(201).json(message);
};

export const getChats = async (req: Request, res: Response) => {
  const user = req.user;
  if (user?.role == "ADMIN") {
    const result = await prisma.user.findMany({
      where: {
        role: "USER",
        sendMessages: {
          some: {
            receiverId: user.id,
          },
        },
        receiveMessages: {
          some: {
            senderId: user.id,
          },
        },
      },
      include: {
        receiveMessages: true,
        sendMessages: true,
      },
    });
    res.json(result);
  } else {
    const result = await prisma.user.findMany({
      where: {
        id: user?.id,
        sendMessages: {
          some: {
            receiverId: user?.id,
          },
        },
        receiveMessages: {
          some: {
            senderId: user?.id,
          },
        },
      },
      include: {
        receiveMessages: true,
        sendMessages: true,
      },
    });
    res.json(result);
  }
};
