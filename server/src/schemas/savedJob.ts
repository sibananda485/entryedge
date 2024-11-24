import { z } from "zod";

export const SavedJobSchema = z.object({
  jobId: z.string(),
});
