import express from "express";

const router = express.Router();

import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/role.middleware.js";
import validate from "../../middleware/validate.middleware.js";

import {
  createJobSchema,
  updateJobSchema,
} from "./job.validation.js";

import {
  createJobController,
  getAllJobsController,
  getSingleJobController,
  updateJobController,
  deleteJobController,
  getMyJobsController,
} from "./job.controller.js";

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/my-jobs",
  protect,
  authorize("client"),
  getMyJobsController
);

router.get(
  "/",
  getAllJobsController
);

router.get(
  "/:id",
  getSingleJobController
);

/*
|--------------------------------------------------------------------------
| Client Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  protect,
  authorize("client"),
  validate(createJobSchema),
  createJobController
);

router.put(
  "/:id",
  protect,
  authorize("client"),
  validate(updateJobSchema),
  updateJobController
);

router.delete(
  "/:id",
  protect,
  authorize("client"),
  deleteJobController
);

export default router;