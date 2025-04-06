import { Request, Response } from "express";
import { prisma } from "..";

import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import { s3 } from "../config/s3";

const storage = multer.memoryStorage();

export const handleGetResume = async (req: Request, res: Response) => {
  const user = req.user;
  res.json("HANDLE GET RESUME");
};

export const handleUploadResume = async (req: Request, res: Response) => {
  const user = req.user;

  try {
    const file = req.file;
    
    if (!file) {
      res.status(400).send("No file uploaded.");
      return;
    }

    const params = {
      Bucket: "your-bucket-name",
      Key: `resumes/${uuidv4()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: "public-read", // or private if you want signed URLs
    };

    const data = await s3.upload(params).promise();

    res.json({ url: data.Location });
    return;
  } catch (err) {
    console.error(err);
    res.status(500).send("Upload failed.");
    return;
  }
};

export const handleDeleteResume = async (req: Request, res: Response) => {
  const user = req.user;

  res.status(200).json("Resume Deleted");
};
