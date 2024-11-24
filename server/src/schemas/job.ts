import { z } from "zod";

const JobSchema = z.object({
  title: z.string().min(1, "Job title is required"),
  location: z.string().min(1, "Location is required"),
  salaryMin: z.string().min(1, "Min salary range is required"),
  salaryMax: z.string().min(1, "Max salary range is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  workHour: z.string().min(1, "Work hours are required"),
  education: z.string().min(1, "Education requirement is required"),
  deadline: z.string().min(1, "Deadline is required"),
  skills: z.string().min(2, {
    message: "Skills must be at least 2 characters.",
  }),
  jd: z.string().min(1, "Job description is required"),
  responsibilities: z.string().min(10, {
    message: "Responsibilities must be at least 10 characters.",
  }),
  qualification: z.string().min(10, {
    message: "Qualifications must be at least 10 characters.",
  }),
});

export default JobSchema;
