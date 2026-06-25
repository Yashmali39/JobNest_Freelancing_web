import { z } from "zod";

export const freelancerProfileSchema =
  z.object({
    title: z
      .string()
      .trim()
      .min(
        3,
        "Title must be at least 3 characters"
      )
      .max(
        100,
        "Title cannot exceed 100 characters"
      ),

    bio: z
      .string()
      .trim()
      .min(
        20,
        "Bio must be at least 20 characters"
      )
      .max(
        1000,
        "Bio cannot exceed 1000 characters"
      ),

    skills: z
      .string()
      .min(
        1,
        "At least one skill is required"
      ),

    experience: z
      .number({
        invalid_type_error:
          "Experience must be a number",
      })
      .min(
        0,
        "Experience cannot be negative"
      )
      .max(
        50,
        "Invalid experience value"
      )
      .optional(),

    hourlyRate: z
      .number({
        invalid_type_error:
          "Hourly rate must be a number",
      })
      .min(
        0,
        "Hourly rate cannot be negative"
      )
      .optional(),

    portfolioLinks: z
      .string()
      .optional(),
  });