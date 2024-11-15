import { z } from "zod";

export const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password cann't be less than 8 character"),
});
export const SignupSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password cann't be less than 8 character"),
  name: z.string().optional(),
});
