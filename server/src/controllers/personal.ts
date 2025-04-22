import { Request, Response } from "express";
import { prisma } from "..";
import { PersonalSchema } from "../schemas/personal";

export const handleGetPersonal = async (req: Request, res: Response) => {
  const user = req.user;
  const personalData = await prisma.personalData.findFirst({
    where: { userId: user?.id },
  });
  res.json(personalData);
};
export const handleGetPersonalById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const personalData = await prisma.personalData.findFirst({
    where: { userId: +id },
    include:{
      User:true
    }
  });
  if (!personalData) {
    res.status(404).json({ message: "Personal data not found" });
    return;
  }
  res.json(personalData);
  return;
};

export const handleUpdatePersonal = async (req: Request, res: Response) => {
  try {
    PersonalSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({ message: "Schema validation error", error });
    return;
  }
  const user = req.user;
  const updatedPersonal = await prisma.personalData.upsert({
    where: {
      userId: user?.id,
    },
    update: {
      ...req.body,
      userId: user?.id,
    },
    create: {
      ...req.body,
      userId: user?.id,
    },
  });
  res.status(201).json(updatedPersonal);
};
