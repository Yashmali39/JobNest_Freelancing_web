import express from "express";

const router = express.Router();

import protect from "../../middleware/auth.middleware.js";

import validate from "../../middleware/validate.middleware.js";

import {
  clientProfileSchema,
} from "./client.validation.js";

import {
  createClientProfile,
  getMyProfile,
  updateMyProfile,
} from "./client.controller.js";

router.post(
  "/profile",
  protect,
  validate(clientProfileSchema),
  createClientProfile
);

router.get(
  "/me",
  protect,
  getMyProfile
);

router.put(
  "/me",
  protect,
  validate(clientProfileSchema),
  updateMyProfile
);

export default router;