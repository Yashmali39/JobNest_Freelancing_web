import Job from "./job.model.js";

import Client from "../clients/client.model.js";

import ApiError from "../../utils/ApiError.js";

const createJob = async (
  userId,
  data
) => {
  const client =
    await Client.findOne({
      userId,
    });

  if (!client) {
    throw new ApiError(
      404,
      "Client profile not found"
    );
  }

  const job =
    await Job.create({
      clientId: client._id,
      ...data,
    });

  return job;
};

const getJobs = async ({
  page = 1,
  limit = 10,
  keyword = "",
}) => {
  const query = {
    title: {
      $regex: keyword,
      $options: "i",
    },
  };

  const skip =
    (page - 1) * limit;

  const jobs =
    await Job.find(query)
      .populate(
        "clientId",
        "companyName industry"
      )
      .skip(skip)
      .limit(limit)
      .sort({
        createdAt: -1,
      });

  const total =
    await Job.countDocuments(
      query
    );

  return {
    jobs,
    total,
    page,
    pages: Math.ceil(
      total / limit
    ),
  };
};


const getJobById = async (
  jobId
) => {
  const job =
    await Job.findById(jobId)
      .populate("clientId");

  if (!job) {
    throw new ApiError(
      404,
      "Job not found"
    );
  }

  return job;
};


const updateJob = async (
  userId,
  jobId,
  data
) => {
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

  Object.assign(job, data);

  await job.save();

  return job;
};


const deleteJob = async (
  userId,
  jobId
) => {
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

  await job.deleteOne();
};

const getMyJobs = async (userId) => {
  const client = await Client.findOne({
    userId,
  });

  if (!client) {
    throw new ApiError(
      404,
      "Client profile not found"
    );
  }

  const jobs = await Job.find({
    clientId: client._id,
  }).sort({
    createdAt: -1,
  });

  return jobs;
};


export {
    createJob,
    getJobs,
    getJobById,
    updateJob,
    deleteJob,
    getMyJobs,
};