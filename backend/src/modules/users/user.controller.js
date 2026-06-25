import asyncHandler from "../../utils/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";

import { switchRole }
from "./user.service.js";

const switchUserRole =
  asyncHandler(
    async (req, res) => {
      const user =
        await switchRole(
          req.user.id,
          req.body.role
        );

      res.status(200).json(
        new ApiResponse(
          200,
          "Role switched successfully",
          user
        )
      );
    }
  );

export {
  switchUserRole,
};