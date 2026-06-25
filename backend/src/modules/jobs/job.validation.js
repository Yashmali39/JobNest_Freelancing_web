import { z } from "zod";

export const createJobSchema =
  z.object({
    title: z
      .string()
      .min(5)
      .max(100),

    description: z
      .string()
      .min(20),

    skillsRequired: z
      .array(z.string())
      .min(1),

    budget: z
      .number()
      .positive(),

    experienceLevel: z
      .enum([
        "Entry",
        "Intermediate",
        "Expert",
      ])
      .optional(),
  });


  export const updateJobSchema =
  createJobSchema.partial();