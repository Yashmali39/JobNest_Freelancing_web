import Client from "./client.model.js";
import User from "../users/user.model.js";

import ApiError from "../../utils/ApiError.js";

const createProfile = async (
  userId,
  data
) => {
  const existingProfile =
    await Client.findOne({
      userId,
    });

  if (existingProfile) {
    throw new ApiError(
      400,
      "Client profile already exists"
    );
  }

  const profile =
    await Client.create({
      userId,
      ...data,
    });

  await User.findByIdAndUpdate(
    userId,
    {
      $addToSet: {
        roles: "client",
      },

      activeRole: "client",

      profileCompleted: true,
    }
  );

  return profile;
};

const getProfile = async (
  userId
) => {
  const profile =
    await Client.findOne({
      userId,
    }).populate(
      "userId",
      "name email profilePicture"
    );

  if (!profile) {
    throw new ApiError(
      404,
      "Client profile not found"
    );
  }

  return profile;
};

const updateProfile = async (
  userId,
  data
) => {
  const profile =
    await Client.findOneAndUpdate(
      { userId },
      data,
      {
        new: true,
      }
    );

  if (!profile) {
    throw new ApiError(
      404,
      "Client profile not found"
    );
  }

  return profile;
};

export {
  createProfile,
  getProfile,
  updateProfile,
};