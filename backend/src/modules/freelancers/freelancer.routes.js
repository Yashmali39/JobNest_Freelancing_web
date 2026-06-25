import express from "express";

const router = express.Router();

import protect from "../../middleware/auth.middleware.js";
import authorize from "../../middleware/role.middleware.js";

import {
  createFreelancerProfile,
  getMyProfile,
  updateMyProfile,
  getFreelancerByIdController,
  getAllFreelancersController,
} from "./freelancer.controller.js";

router.post(
  "/profile",
  protect,
  createFreelancerProfile
);

router.get(
  "/me",
  protect,
  getMyProfile
);

router.put(
  "/me",
  protect,
  updateMyProfile
);

router.get(
  "/",
  protect,
  authorize("client"),
  getAllFreelancersController
);

router.get(
  "/:id",
  protect,
  getFreelancerByIdController
);

export default router;