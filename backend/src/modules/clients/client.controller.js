import asyncHandler from "../../utils/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";

import {
  createProfile,
  getProfile,
  updateProfile,
} from "./client.service.js";

const createClientProfile =
  asyncHandler(
    async (req, res) => {
      const profile =
        await createProfile(
          req.user.id,
          req.body
        );

      res.status(201).json(
        new ApiResponse(
          201,
          "Client profile created",
          profile
        )
      );
    }
  );

const getMyProfile =
  asyncHandler(
    async (req, res) => {
      const profile =
        await getProfile(
          req.user.id
        );

      res.status(200).json(
        new ApiResponse(
          200,
          "Client profile fetched",
          profile
        )
      );
    }
  );

const updateMyProfile =
  asyncHandler(
    async (req, res) => {
      const profile =
        await updateProfile(
          req.user.id,
          req.body
        );

      res.status(200).json(
        new ApiResponse(
          200,
          "Client profile updated",
          profile
        )
      );
    }
  );

export {
  createClientProfile,
  getMyProfile,
  updateMyProfile,
};