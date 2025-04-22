import { Request, Response } from "express";
import { prisma } from "..";
import { EducationSchema } from "../schemas/education";

export const handleGetEducation = async (req: Request, res: Response) => {
  const user = req.user;
  const educations = await prisma.education.findMany({
    where: { userId: user?.id },
    orderBy: {
      startDate: "desc",
    },
  });
  res.json(educations);
};
export const handleGetEducationById = async (req: Request, res: Response) => {
  const education = await prisma.education.findMany({
    where: {
      userId: +req.params.id,
    },
    orderBy: {
      startDate: "desc",
    },
  });
  if (!education) {
    res.status(404).json({
      message: "Education not found",
    });
    return;
  }
  res.json(education);
};

export const handleCreateEducation = async (req: Request, res: Response) => {
  try {
    EducationSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({ message: "Schema validation error", error });
    return;
  }
  const user = req.user;
  const ducation = await prisma.education.create({
    data: { ...req.body, userId: user?.id },
  });
  res.status(201).json(ducation);
};

export const handleUpdateEducation = async (req: Request, res: Response) => {
  try {
    EducationSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({ message: "Schema validation error", error });
    return;
  }
  const user = req.user;
  const education = await prisma.education.findFirst({
    where: {
      id: +req.params.id,
      userId: user?.id,
    },
  });
  if (!education) {
    res.status(404).json({
      message: "Education not found",
    });
    return;
  }
  const updatedEducation = await prisma.education.update({
    where: {
      id: +req.params.id,
    },
    data: req.body,
  });
  res.status(201).json(updatedEducation);
};

export const handleDeleteEducation = async (req: Request, res: Response) => {
  const user = req.user;
  const education = await prisma.education.findFirst({
    where: {
      id: +req.params.id,
      userId: user?.id,
    },
  });
  if (!education) {
    res.status(404).json({
      message: "Education not found",
    });
    return;
  }
  const deletedEducation = await prisma.education.delete({
    where: {
      id: +req.params.id,
    },
  });
  res.status(200).json(deletedEducation);
};
