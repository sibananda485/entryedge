import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password cann't be less than 8 character"),
});
export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password cann't be less than 8 character"),
  role: z.string().min(1, "Select a option"),
  firstName: z.string(),
  middleName: z.string(),
  lastName: z.string(),
  name: z.string(),
});
