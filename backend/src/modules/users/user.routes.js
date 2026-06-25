import express from "express";

const router = express.Router();

import protect from "../../middleware/auth.middleware.js";

import validate from "../../middleware/validate.middleware.js";

import {
  switchRoleSchema,
} from "./user.validation.js";

import {
  switchUserRole,
} from "./user.controller.js";

router.patch(
  "/switch-role",
  protect,
  validate(
    switchRoleSchema
  ),
  switchUserRole
);

export default router;