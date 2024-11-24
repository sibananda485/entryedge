import { Request, Response } from "express";
import { prisma } from "..";

export const handleGetSavedJob = async (req: Request, res: Response) => {
  const user = req.user;
  const savedJobs = await prisma.personalData.findFirst({
    where: { userId: user?.id },
    select: {
      savedJob: {
        select: {
          id: true,
          title: true,
          location: true,
          Company: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  res.json(savedJobs?.savedJob);
};

export const handleCreateSavedJob = async (req: Request, res: Response) => {
  const user = req.user;
  const job = await prisma.job.findFirst({
    where: {
      id: +req.params.id,
    },
  });
  if (!job) {
    res.status(404).json({ message: "Job not found" });
    return;
  }
  const savedJobs = await prisma.personalData.update({
    where: {
      userId: user?.id,
    },
    data: {
      savedJob: {
        connect: {
          id: +req.params.id,
        },
      },
    },
    select: {
      savedJob: {
        select: {
          id: true,
          title: true,
          location: true,
          Company: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  res.status(201).json(savedJobs.savedJob);
};

export const handleDeleteSavedJob = async (req: Request, res: Response) => {
  const user = req.user;
  const job = await prisma.personalData.findFirst({
    where: {
      userId: user?.id,
      savedJob: {
        some: { id: +req.params.id },
      },
    },
  });
  if (!job) {
    res.status(404).json({ message: "Job not found" });
    return;
  }
  const deletedSavedJob = await prisma.personalData.update({
    where: {
      userId: user?.id,
    },
    data: {
      savedJob: {
        disconnect: { id: +req.params.id },
      },
    },
    select: {
      savedJob: {
        select: {
          id: true,
          title: true,
          location: true,
          Company: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
  res.status(200).json(deletedSavedJob.savedJob);
};
