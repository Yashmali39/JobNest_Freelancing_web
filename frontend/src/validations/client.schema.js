import { z } from "zod";

export const clientProfileSchema =
  z.object({
    companyName: z
      .string()
      .trim()
      .min(
        2,
        "Company name must be at least 2 characters"
      )
      .max(
        100,
        "Company name cannot exceed 100 characters"
      ),

    companyDescription: z
      .string()
      .trim()
      .min(
        20,
        "Company description must be at least 20 characters"
      )
      .max(
        1000,
        "Company description cannot exceed 1000 characters"
      ),

    industry: z
      .string()
      .trim()
      .min(
        2,
        "Industry is required"
      ),

    website: z
      .string()
      .url(
        "Invalid website URL"
      )
      .optional()
      .or(z.literal("")),

    companySize: z
      .enum([
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "500+",
      ])
      .optional(),
  });