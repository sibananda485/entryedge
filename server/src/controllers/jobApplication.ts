import { Request, Response } from "express";
import { prisma } from "..";

export const handleGetJobApplication = async (req: Request, res: Response) => {
  const user = req.user;
  if (user?.role == "USER") {
    const jobApplications2 = await prisma.personalData.findFirst({
      where: {
        userId: user.id,
      },
      select: {
        JobApplication: {
          include: {
            job: {
              include: {
                Company: true,
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
      },
    });
    res.json(jobApplications2?.JobApplication);
  }
};

export const handleCreateJobApplication = async (
  req: Request,
  res: Response
) => {
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
  const personalData = await prisma.personalData.findFirst({
    where: {
      userId: user?.id,
    },
  });
  const isExists = await prisma.jobApplication.findFirst({
    where: {
      jobId: +req.params.id,
      personalDataId: personalData?.id,
    },
  });
  if (isExists) {
    res.status(400).json({ message: "You have already applied for this job" });
    return;
  }
  if (personalData) {
    const jobApplication = await prisma.jobApplication.create({
      data: {
        jobId: +req.params.id,
        personalDataId: personalData?.id,
      },
      include: {
        job: { include: { Company: true } },
      },
    });
    res.status(201).json(jobApplication);
    return;
  }
};

export const handleDeleteJobApplication = async (
  req: Request,
  res: Response
) => {
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
  const deletedJobApplication = await prisma.personalData.update({
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
  res.status(200).json(deletedJobApplication.savedJob);
};
