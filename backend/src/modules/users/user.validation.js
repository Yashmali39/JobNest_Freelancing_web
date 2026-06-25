import { z } from "zod";

export const switchRoleSchema = z.object({
  role: z.enum([
    "freelancer",
    "client",
  ]),
});