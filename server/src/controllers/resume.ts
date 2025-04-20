import { Request, Response } from "express";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import s3Client from "../config/s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { prisma } from "..";

const uploadToBucket = async (bucket: string, filename: string) => {
  const command = new PutObjectCommand({
    Bucket: bucket,
    Key: `${filename}`,
    ContentType: "application/pdf",
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
};

const getSignedUrlFromBucket = async (bucket: string, key: string) => {
  const command = new GetObjectCommand({
    Bucket: bucket,
    Key: key,
  });
  const url = await getSignedUrl(s3Client, command);
  return url;
};

export const handleUploadResume = async (req: Request, res: Response) => {
  const user = req.user;
  if (!req.query) {
    res.status(400).json({ error: "No file provided" });
    return;
  }
  const uniqueKey = `${user?.id}-${Date.now()}-${req.query.name}`;
  const url = await uploadToBucket("entryedge", uniqueKey);
  await prisma.personalData.update({
    where: {
      userId: user?.id,
    },
    data: {
      resume: `/${uniqueKey}`,
      resumeFileName: req.query.name as string,
      resumeUpdatedAt: new Date(),
    },
  });
  res.json(url);
  return;
};

export const handleDeleteResume = async (req: Request, res: Response) => {
  const user = req.user;
  await prisma.personalData.update({
    where: {
      userId: user?.id,
    },
    data: {
      resume: null,
      resumeFileName: null,
      resumeUpdatedAt: null,
    },
  });
  res.status(200).json({ message: "Resume Deleted" });
};
