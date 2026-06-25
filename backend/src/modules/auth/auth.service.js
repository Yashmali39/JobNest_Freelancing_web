import bcrypt from "bcryptjs";

import User from "../users/user.model.js";

import ApiError from "../../utils/ApiError.js";

const registerUser = async ({
  name,
  email,
  password,
}) => {
  const existingUser = await User.findOne({
    email,
  });

  if (existingUser) {
    throw new ApiError(
      400,
      "User already exists"
    );
  }

  const hashedPassword =
    await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return user;
};

const loginUser = async ({
  email,
  password,
}) => {
  const user = await User.findOne({
    email,
  }).select("+password");

  if (!user) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  const isMatch =
    await bcrypt.compare(
      password,
      user.password
    );

  if (!isMatch) {
    throw new ApiError(
      401,
      "Invalid credentials"
    );
  }

  return user;
};

export {
  registerUser,
  loginUser,
};