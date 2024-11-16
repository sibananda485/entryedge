import { Request, Response } from "express";
import { prisma } from "..";
import { CompanySchema } from "../schemas/company";

export const handleGetCompany = async (req: Request, res: Response) => {
  const user = req.user;
  const company = await prisma.company.findFirst({
    where: { userId: user?.id },
  });
  res.json(company);
};
export const handleUpdateCompany = async (req: Request, res: Response) => {
  try {
    CompanySchema.parse(req.body);
  } catch (error) {
    res.status(400).json({ message: "Schema validation error", error });
    return;
  }
  const user = req.user;
  const updatedCompany = await prisma.company.upsert({
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
  res.status(201).json(updatedCompany);
};
