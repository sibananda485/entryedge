import { z } from "zod";

export const PersonalSchema = z.object({
  firstName: z
    .string()
    .min(2, { message: "First name must be at least 2 characters." }),
  middleName: z
    .string()
    .min(2, { message: "Middle name must be at least 2 characters." }),
  lastName: z
    .string()
    .min(2, { message: "Last name must be at least 2 characters." }),
  dob: z.preprocess(
    (value) => (typeof value === "string" ? new Date(value) : value),
    z.date().refine((date) => !isNaN(date.getTime()), {
      message: "Invalid date",
    })
  ),
  street: z.string().min(1, { message: "Street address is required." }),
  city: z.string().min(1, { message: "City is required." }),
  state: z.string().min(1, { message: "State is required." }),
  country: z.string().min(1, { message: "Country is required." }),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, { message: "Invalid phone number format." }),
  zipCode: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, { message: "Invalid ZIP code." }),
  bio: z.string().optional(),
});
