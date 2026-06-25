import Application from "./application.model.js";
import Job from "../jobs/job.model.js";
import Freelancer from "../freelancers/freelancer.model.js";
import Client from "../clients/client.model.js";

import ApiError from "../../utils/ApiError.js";


const applyToJob = async (
  userId,
  data
) => {
  const freelancer =
    await Freelancer.findOne({
      userId,
    });

  if (!freelancer) {
    throw new ApiError(
      404,
      "Freelancer profile not found"
    );
  }

  const job =
    await Job.findById(
      data.jobId
    );

  if (!job) {
    throw new ApiError(
      404,
      "Job not found"
    );
  }

  const existingApplication =
    await Application.findOne({
      jobId: data.jobId,
      freelancerId:
        freelancer._id,
    });

  if (
    existingApplication
  ) {
    throw new ApiError(
      400,
      "You have already applied"
    );
  }

  const application =
    await Application.create({
      jobId: data.jobId,

      freelancerId:
        freelancer._id,

      coverLetter:
        data.coverLetter,
    });

  return application;
};


const getMyApplications =
  async (userId) => {
    const freelancer =
      await Freelancer.findOne({
        userId,
      });

    return await Application.find(
      {
        freelancerId:
          freelancer._id,
      }
    )
      .populate("jobId")
      .sort({
        createdAt: -1,
      });
  };


const getApplicantsForJob =
  async (userId, jobId) => {
    const client =
      await Client.findOne({
        userId,
      });

    const job =
      await Job.findById(jobId);

    if (!job) {
      throw new ApiError(
        404,
        "Job not found"
      );
    }

    if (
      job.clientId.toString() !==
      client._id.toString()
    ) {
      throw new ApiError(
        403,
        "Unauthorized"
      );
    }

    return await Application.find(
      { jobId }
    ).populate({
      path: "freelancerId",
      populate: {
        path: "userId",
        select:
          "name email profilePicture",
      },
    });
  };


const updateApplicationStatus =
  async (
    userId,
    applicationId,
    status
  ) => {
    const client =
      await Client.findOne({
        userId,
      });

    const application =
      await Application.findById(
        applicationId
      ).populate("jobId");

    if (!application) {
      throw new ApiError(
        404,
        "Application not found"
      );
    }

    if (
      application.jobId.clientId.toString() !==
      client._id.toString()
    ) {
      throw new ApiError(
        403,
        "Unauthorized"
      );
    }

    application.status =
      status;

    await application.save();

    return application;
  };


const withdrawApplication =
  async (
    userId,
    applicationId
  ) => {
    const freelancer =
      await Freelancer.findOne({
        userId,
      });

    const application =
      await Application.findById(
        applicationId
      );

    if (!application) {
      throw new ApiError(
        404,
        "Application not found"
      );
    }

    if (
      application.freelancerId.toString() !==
      freelancer._id.toString()
    ) {
      throw new ApiError(
        403,
        "Unauthorized"
      );
    }

    await application.deleteOne();
  };


export {
  applyToJob,
  getMyApplications,
  getApplicantsForJob,
  updateApplicationStatus,
  withdrawApplication,
};

