import { z } from "zod";

export const ExperienceSchema = z.object({
  company: z.string().min(1, { message: "Company is required." }),
  jobTitle: z.string().min(1, { message: "Job title is required." }),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().optional(),
  description: z.string().optional(),
  isCurrent: z.boolean(),
  industry: z.string().optional(),
  employmentType: z.string(),
});

type  a = z.infer<typeof ExperienceSchema>
