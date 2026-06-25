import express from "express";

const router = express.Router();

import protect from "../../middleware/auth.middleware.js";

import authorize from "../../middleware/role.middleware.js";

import {
  generateJobDescriptionController,
  calculateJobMatchController,
  generateProposalController,
} from "./ai.controller.js";

router.post(
  "/job-description",
  protect,
  authorize("client"),
  generateJobDescriptionController
);

router.post(
  "/job-match/:jobId",
  protect,
  authorize("freelancer"),
  calculateJobMatchController
);

router.post(
  "/proposal/:jobId",
  protect,
  authorize("freelancer"),
  generateProposalController
);

export default router;