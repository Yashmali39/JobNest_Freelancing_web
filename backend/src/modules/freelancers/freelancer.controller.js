import asyncHandler from "../../utils/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";

import {
  createProfile,
  getProfile,
  updateProfile,
  getFreelancerById,
  getAllFreelancers,
} from "./freelancer.service.js";

const createFreelancerProfile =
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
          "Freelancer profile created",
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
          "Profile fetched",
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
          "Profile updated",
          profile
        )
      );
    }
  );

  const getFreelancerByIdController =
  asyncHandler(async (req, res) => {
    const freelancer =
      await getFreelancerById(
        req.params.id
      );

    res.status(200).json(
      new ApiResponse(
        200,
        "Freelancer fetched successfully",
        freelancer
      )
    );
  });

const getAllFreelancersController =
  asyncHandler(async (req, res) => {
    const freelancers =
      await getAllFreelancers();

    res.status(200).json(
      new ApiResponse(
        200,
        "Freelancers fetched successfully",
        freelancers
      )
    );
  });



export {
  createFreelancerProfile,
  getMyProfile,
  updateMyProfile,
  getFreelancerByIdController,
  getAllFreelancersController,
};