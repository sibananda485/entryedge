import { Request, Response } from "express";
import { prisma } from "..";

export const handleGetAllCandidate = async (req: Request, res: Response) => {
  const user = req.user;
  const candidates = await prisma.personalData.findMany({
    select: {
      id: true,
      firstName: true,
      middleName: true,
      lastName: true,
      userId: true,
    },
  });
  const candidateWithLastMessage = await Promise.all(
    candidates.map(async (candidate) => {
      const message = await prisma.messages.findFirst({
        where: {
          OR: [
            { senderId: user?.id, receiverId: candidate.userId },
            { senderId: candidate.userId, receiverId: user?.id },
          ],
        },
        orderBy: { createdAt: "desc" },
      });

      return { ...candidate, lastMessage: message };
    })
  );

  res.json(candidateWithLastMessage);
};
