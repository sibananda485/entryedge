import { z } from "zod";

export const CompanySchema = z.object({
  name: z.string().min(2, "Company name must be at least 2 characters"),
  industry: z.string().min(2, "Industry must be at least 2 characters"),
  bio: z.string().min(10, "Bio must be at least 10 characters"),
  website: z.string().url("Please enter a valid URL"),
  linkedIn: z.string().url("Please enter a valid LinkedIn URL"),
  instagram: z.string().url("Please enter a valid Instagram URL"),
  zip: z.string().min(5, "ZIP code must be at least 5 characters"),
  country: z.string().min(2, "Country must be at least 2 characters"),
  city: z.string().min(2, "City must be at least 2 characters"),
  state: z.string().min(2, "State must be at least 2 characters"),
  size: z.enum(["SMALL", "MEDIUM", "LARGE"]),
  startDate: z.string().min(1, "Start date required"),
});
