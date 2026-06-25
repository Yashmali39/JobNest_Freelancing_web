import express from "express";

const router = express.Router();

import authRoutes from "../modules/auth/auth.routes.js";
import freelancerRoutes from "../modules/freelancers/freelancer.routes.js";
import clientRoutes from "../modules/clients/client.routes.js";
import userRoutes from "../modules/users/user.routes.js";
import jobRoutes from "../modules/jobs/job.routes.js";
import applicationRoutes from "../modules/applications/application.routes.js";
import resumeRoutes from "../modules/resumes/resume.routes.js";
import aiRoutes from "../modules/ai/ai.routes.js";

router.use(
  "/auth",
  authRoutes
);

router.use(
  "/freelancers",
  freelancerRoutes
);

router.use(
  "/clients",
  clientRoutes
);

router.use(
  "/users",
  userRoutes
);

router.use(
  "/jobs",
  jobRoutes
);

router.use(
  "/applications",
  applicationRoutes
);

router.use(
  "/resumes",
  resumeRoutes
);

router.use(
  "/ai",
  aiRoutes
);

export default router;