import { Request, Response } from "express";
import { prisma } from "..";
import { ExperienceSchema } from "../schemas/experience";

export const handleGetExperience = async (req: Request, res: Response) => {
  const user = req.user;
  const experience = await prisma.experience.findMany({
    where: { userId: user?.id },
    orderBy: {
      startDate: "desc",
    },
  });
  res.json(experience);
};

export const handleGetExperienceById = async (req: Request, res: Response) => {
  const experience = await prisma.experience.findMany({
    where: {
      userId: +req.params.id,
    },
    orderBy: {
      startDate: "desc",
    },
  });
  if (!experience) {
    res.status(404).json({
      message: "Experience not found",
    });
    return;
  }
  res.json(experience);
};

export const handleCreateExperience = async (req: Request, res: Response) => {
  try {
    ExperienceSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({ message: "Schema validation error", error });
    return;
  }
  const user = req.user;
  const experience = await prisma.experience.create({
    data: { ...req.body, userId: user?.id },
  });
  res.status(201).json(experience);
};

export const handleUpdateExperience = async (req: Request, res: Response) => {
  try {
    ExperienceSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({ message: "Schema validation error", error });
    return;
  }
  const user = req.user;
  const experience = await prisma.experience.findFirst({
    where: {
      id: +req.params.id,
      userId: user?.id,
    },
  });
  if (!experience) {
    res.status(404).json({
      message: "Experience not found",
    });
    return;
  }
  const updatedExperience = await prisma.experience.update({
    where: {
      id: +req.params.id,
    },
    data: req.body,
  });
  res.status(201).json(updatedExperience);
};

export const handleDeleteExperience = async (req: Request, res: Response) => {
  const user = req.user;
  const experience = await prisma.experience.findFirst({
    where: {
      id: +req.params.id,
      userId: user?.id,
    },
  });
  if (!experience) {
    res.status(404).json({
      message: "Experience not found",
    });
    return;
  }
  const deletedExperience = await prisma.experience.delete({
    where: {
      id: +req.params.id,
    },
  });
  res.status(200).json(deletedExperience);
};
