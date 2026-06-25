import Freelancer from "./freelancer.model.js";

import User from "../users/user.model.js";

import ApiError from "../../utils/ApiError.js";

const createProfile = async (
  userId,
  data
) => {
  const existingProfile =
    await Freelancer.findOne({
      userId,
    });

  if (existingProfile) {
    throw new ApiError(
      400,
      "Freelancer profile already exists"
    );
  }

  const profile =
    await Freelancer.create({
      userId,
      ...data,
    });

  await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        roles: "freelancer",
      },

      activeRole: "freelancer",

      profileCompleted: true,
    }
  );

  return profile;
};

const getProfile = async (
  userId
) => {
  const profile =
    await Freelancer.findOne({
      userId,
    }).populate(
      "userId",
      "name email profilePicture"
    );

  if (!profile) {
    throw new ApiError(
      404,
      "Freelancer profile not found"
    );
  }

  return profile;
};

const updateProfile = async (
  userId,
  data
) => {
  const profile =
    await Freelancer.findOneAndUpdate(
      { userId },
      data,
      {
        new: true,
      }
    );

  if (!profile) {
    throw new ApiError(
      404,
      "Freelancer profile not found"
    );
  }

  return profile;
};

const getFreelancerById =
  async (freelancerId) => {

    const freelancer =
  await Freelancer.findById(freelancerId)
    .populate(
      "userId",
      "name email"
    );
      
      
    if (!freelancer) {
      throw new ApiError(
        404,
        "Freelancer not found"
      );
    }

    return freelancer;
  };

const getAllFreelancers =
  async () => {
    const freelancers =
      await Freelancer.find()
        .populate(
          "userId",
          "name email"
        )
        .select(`
          title
          bio
          skills
          experience
          hourlyRate
          portfolioLinks
          resumeUrl
          resumeText
          userId
        `)
        .sort({
          createdAt: -1,
        });

    return freelancers;
  };

export {
  createProfile,
  getProfile,
  updateProfile,
  getFreelancerById,
  getAllFreelancers,
};