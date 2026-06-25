import { z } from "zod";

export const jobSchema =
  z.object({
    title: z
      .string()
      .min(
        5,
        "Title must be at least 5 characters"
      )
      .max(
        100,
        "Title cannot exceed 100 characters"
      ),

    description: z
      .string()
      .min(
        20,
        "Description must be at least 20 characters"
      ),

    skillsRequired:
      z.string().min(
        1,
        "At least one skill is required"
      ),

    budget: z
      .number()
      .positive(
        "Budget must be positive"
      ),

    experienceLevel:
      z.enum([
        "Entry",
        "Intermediate",
        "Expert",
      ]),
  });