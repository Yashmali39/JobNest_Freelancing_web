import asyncHandler from "../../utils/asyncHandler.js";
import ApiResponse from "../../utils/ApiResponse.js";

import {
  createJob,
  getJobs,
  getJobById,
  updateJob,
  deleteJob,
  getMyJobs,
} from "./job.service.js";

const createJobController = asyncHandler(
  async (req, res) => {
    const job = await createJob(
      req.user.id,
      req.body
    );

    res.status(201).json(
      new ApiResponse(
        201,
        "Job created successfully",
        job
      )
    );
  }
);

const getAllJobsController = asyncHandler(
  async (req, res) => {
    const result = await getJobs({
      page: Number(req.query.page) || 1,
      limit: Number(req.query.limit) || 10,
      keyword: req.query.keyword || "",
    });

    res.status(200).json(
      new ApiResponse(
        200,
        "Jobs fetched successfully",
        result
      )
    );
  }
);

const getSingleJobController =
  asyncHandler(async (req, res) => {
    const job = await getJobById(
      req.params.id
    );

    res.status(200).json(
      new ApiResponse(
        200,
        "Job fetched successfully",
        job
      )
    );
  });

const updateJobController =
  asyncHandler(async (req, res) => {
    const job = await updateJob(
      req.user.id,
      req.params.id,
      req.body
    );

    res.status(200).json(
      new ApiResponse(
        200,
        "Job updated successfully",
        job
      )
    );
  });

const deleteJobController =
  asyncHandler(async (req, res) => {
    await deleteJob(
      req.user.id,
      req.params.id
    );

    res.status(200).json(
      new ApiResponse(
        200,
        "Job deleted successfully"
      )
    );
  });

  const getMyJobsController =
  asyncHandler(async (req, res) => {
    const jobs =
      await getMyJobs(
        req.user.id
      );

    res.status(200).json(
      new ApiResponse(
        200,
        "Jobs fetched successfully",
        jobs
      )
    );
  });

export {
  createJobController,
  getAllJobsController,
  getSingleJobController,
  updateJobController,
  deleteJobController,
  getMyJobsController,
};