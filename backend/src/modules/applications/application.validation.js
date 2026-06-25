import { z } from "zod";

export const createApplicationSchema =
  z.object({
    jobId: z.string(),

    coverLetter: z
      .string()
      .min(
        20,
        "Cover letter must be at least 20 characters"
      )
      .max(2000),
  });

export const updateStatusSchema =
  z.object({
    status: z.enum([
      "accepted",
      "rejected",
    ]),
  });