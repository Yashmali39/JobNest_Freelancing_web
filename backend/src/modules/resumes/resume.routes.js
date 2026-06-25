import express from "express";

const router = express.Router();

import protect from "../../middleware/auth.middleware.js";

import authorize from "../../middleware/role.middleware.js";

import upload from "../../middleware/upload.middleware.js";

import {
  uploadResumeController,
  getResumeController,
  getResumeTextController,
} from "./resume.controller.js";

router.post(
  "/upload",
  protect,
  authorize("freelancer"),
  upload.single("resume"),
  uploadResumeController
);

router.get(
  "/me",
  protect,
  authorize("freelancer"),
  getResumeController
);

router.get(
  "/resume-text",
  protect,
  authorize("freelancer"),
  getResumeTextController
);

export default router;