import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  applyToJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
  withdrawApplication,
} from "./application.service.js";

const applyToJobController =
  asyncHandler(async (req, res) => {
    const application =
      await applyToJob(
        req.user.id,
        req.body
      );

    res.status(201).json(
      new ApiResponse(
        201,
        "Application submitted successfully",
        application
      )
    );
  });

const getMyApplicationsController =
  asyncHandler(async (req, res) => {
    const applications =
      await getMyApplications(
        req.user.id
      );

    res.status(200).json(
      new ApiResponse(
        200,
        "Applications fetched successfully",
        applications
      )
    );
  });

const getApplicantsForJobController =
  asyncHandler(async (req, res) => {
    const applications =
      await getApplicantsForJob(
        req.user.id,
        req.params.jobId
      );

    res.status(200).json(
      new ApiResponse(
        200,
        "Applicants fetched successfully",
        applications
      )
    );
  });

const updateApplicationStatusController =
  asyncHandler(async (req, res) => {
    const application =
      await updateApplicationStatus(
        req.user.id,
        req.params.id,
        req.body.status
      );

    res.status(200).json(
      new ApiResponse(
        200,
        "Application updated successfully",
        application
      )
    );
  });

const withdrawApplicationController =
  asyncHandler(async (req, res) => {
    await withdrawApplication(
      req.user.id,
      req.params.id
    );

    res.status(200).json(
      new ApiResponse(
        200,
        "Application withdrawn successfully"
      )
    );
  });

export {
  applyToJobController,
  getMyApplicationsController,
  getApplicantsForJobController,
  updateApplicationStatusController,
  withdrawApplicationController,
};