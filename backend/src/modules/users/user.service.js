import User from "./user.model.js";

import ApiError from "../../utils/ApiError.js";

const switchRole = async (
  userId,
  role
) => {
  const user =
    await User.findById(userId);

  if (!user) {
    throw new ApiError(
      404,
      "User not found"
    );
  }

  if (
    !user.roles.includes(role)
  ) {
    throw new ApiError(
      400,
      `You do not have a ${role} profile`
    );
  }

  user.activeRole = role;

  await user.save();

  return user;
};

export {
  switchRole,
};