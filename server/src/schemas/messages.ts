import { z } from "zod";

export const MessageSchema = z.object({
  message: z.string().min(1, "message Required"),
  senderId: z.string().min(1, "senderId Required"),
  receiverId: z.string().min(1, "receiverId Required"),
});
