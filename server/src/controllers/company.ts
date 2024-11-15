import { Request, Response } from "express";

export const handleGetCompany = async (req: Request, res: Response) => {
  res.json({ message: "Message by passed successfully", user: req.body.user });
};
export const handleCreateCompany = async (req: Request, res: Response) => {};
export const handleUpdateCompany = async (req: Request, res: Response) => {};
