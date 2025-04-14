import { Request, Response } from "express";
import { prisma } from "..";
import JobSchema from "../schemas/job";

export const handleGetJob = async (req: Request, res: Response) => {
  const user = req.user;
  if (user && (user.role = "ADMIN")) {
    const company = await prisma.company.findFirst({
      where: {
        userId: user.id,
      },
    });
    const jobs = await prisma.job.findMany({
      where: {
        companyId: company?.id,
      },
      select: {
        id: true,
        deadline: true,
        companyId: true,
        location: true,
        skills: true,
        salaryMax: true,
        salaryMin: true,
        employmentType: true,
        title: true,
        isActive: true,
        Company: {
          select: {
            bio: true,
            website: true,
            name: true,
          },
        },
      },
    });
    res.json(jobs);
    return;
  } else {
    const jobs = await prisma.job.findMany({
      select: {
        id: true,
        deadline: true,
        companyId: true,
        location: true,
        skills: true,
        salaryMax: true,
        salaryMin: true,
        employmentType: true,
        title: true,
        Company: {
          select: {
            bio: true,
            website: true,
            name: true,
          },
        },
      },
    });
    res.json(jobs);
  }
};
export const handleGetJobById = async (req: Request, res: Response) => {
  const user = req.user;

  try {
    if (user && user.role == "ADMIN") {
      const company = await prisma.company.findFirstOrThrow({
        where: {
          userId: user.id,
        },
      });
      const job = await prisma.job.findFirstOrThrow({
        where: {
          companyId: company?.id,
          id: +req.params.id,
        },
        include: {
          Company: {
            select: {
              bio: true,
              website: true,
              name: true,
              industry: true,
            },
          },
        },
      });
      res.json(job);
      return;
    } else {
      const job = await prisma.job.findFirstOrThrow({
        where: {
          id: +req.params.id,
        },
        include: {
          Company: {
            select: {
              bio: true,
              website: true,
              name: true,
              industry: true,
            },
          },
        },
      });
      res.json(job);
    }
  } catch (error) {
    res.status(404).json({ message: "Job not found haha" });
    return;
  }
};

export const handleCreateJob = async (req: Request, res: Response) => {
  try {
    JobSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({ message: "Schema validation error", error });
    return;
  }
  const user = req.user;
  const company = await prisma.company.findFirst({
    where: {
      userId: user?.id,
    },
  });

  const createdJob = await prisma.job.create({
    data: { ...req.body, companyId: company?.id },
  });

  res.status(201).json(createdJob);
};
export const handleUpdateJob = async (req: Request, res: Response) => {
  try {
    JobSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({ message: "Schema validation error", error });
    return;
  }
  const user = req.user;
  const company = await prisma.company.findFirst({
    where: {
      userId: user?.id,
    },
  });
  const job = await prisma.job.findFirst({
    where: {
      id: +req.params.id,
      companyId: company?.id,
    },
  });
  if (!job) {
    res.status(404).json({
      message: "Job not found",
    });
    return;
  }
  const updatedJob = await prisma.job.update({
    where: {
      id: +req.params.id,
    },
    data: req.body,
  });
  res.status(201).json(updatedJob);
};
export const handleDeleteJob = async (req: Request, res: Response) => {
  try {
    JobSchema.parse(req.body);
  } catch (error) {
    res.status(400).json({ message: "Schema validation error", error });
    return;
  }
  const user = req.user;
  const company = await prisma.company.findFirst({
    where: {
      userId: user?.id,
    },
  });
  const job = await prisma.job.findFirst({
    where: {
      id: +req.params.id,
      companyId: company?.id,
    },
  });
  if (!job) {
    res.status(404).json({
      message: "Job not found",
    });
    return;
  }
  const deletedJob = await prisma.job.delete({
    where: {
      id: +req.params.id,
    },
  });
  res.status(200).json(deletedJob);
};
