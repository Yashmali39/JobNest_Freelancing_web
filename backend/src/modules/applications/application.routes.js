import express from "express";

const router = express.Router();

import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/role.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import {
  createApplicationSchema,
  updateStatusSchema,
} from "./application.validation.js";

import {
  applyToJobController,
  getMyApplicationsController,
  getApplicantsForJobController,
  updateApplicationStatusController,
  withdrawApplicationController,
} from "./application.controller.js";

/*
|--------------------------------------------------------------------------
| Freelancer Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  authorize("freelancer"),
  validate(createApplicationSchema),
  applyToJobController
);

router.get(
  "/my",
  protect,
  authorize("freelancer"),
  getMyApplicationsController
);

router.delete(
  "/:id",
  protect,
  authorize("freelancer"),
  withdrawApplicationController
);

/*
|--------------------------------------------------------------------------
| Client Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/job/:jobId",
  protect,
  authorize("client"),
  getApplicantsForJobController
);

router.patch(
  "/:id/status",
  protect,
  authorize("client"),
  validate(updateStatusSchema),
  updateApplicationStatusController
);

export default router;