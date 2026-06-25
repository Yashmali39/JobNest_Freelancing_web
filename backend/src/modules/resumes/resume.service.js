import Freelancer from "../freelancers/freelancer.model.js";

import ApiError from "../../utils/ApiError.js";

const uploadResume = async (
  userId,
  resumeUrl,
  resumeText
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

  freelancer.resumeUrl =
    resumeUrl;

  freelancer.resumeText =
    resumeText;

  await freelancer.save();

  return freelancer;
};

const getResume = async (
  userId
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

  return freelancer.resumeUrl;
};

export {
  uploadResume,
  getResume,
};