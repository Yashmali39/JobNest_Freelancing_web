import express from "express";

const router = express.Router();

import {
  register,
  login,
  logout,
  getCurrentUser,
} from "./auth.controller.js";

import validate from "../../middleware/validate.middleware.js";

import protect from "../../middleware/auth.middleware.js";

import {
  registerSchema,
  loginSchema,
} from "./auth.validation.js";

router.post(
  "/register",
  validate(registerSchema),
  register
);

router.post(
  "/login",
  validate(loginSchema),
  login
);

router.post(
  "/logout",
  logout
);

router.get(
  "/me",
  protect,
  getCurrentUser
);

export default router;