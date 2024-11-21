import { z } from "zod";

export const EducationSchema = z.object({
  institution: z.string().min(1, { message: "Institution is required." }),
  degree: z.string().min(1, { message: "Degree is required." }),
  fieldOfStudy: z.string().min(1, { message: "Field of study is required." }),
  startDate: z.string(),
  endDate: z.string().optional(),
  description: z.string().optional(),
  isPursuing: z.boolean(),
});
