import asyncHandler from "../../utils/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";

import generateToken from "../../utils/generateToken.js";

import User from "../users/user.model.js";

import {
  registerUser,
  loginUser,
} from "./auth.service.js";

const register = asyncHandler(
  async (req, res) => {
    const user =
      await registerUser(req.body);

    res.status(201).json(
      new ApiResponse(
        201,
        "User registered successfully",
        user
      )
    );
  }
);

const login = asyncHandler(
  async (req, res) => {
    const user =
      await loginUser(req.body);

    const token =
      generateToken({
        id: user._id,
      });

    const isProduction =
      process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction
        ? "none"
        : "lax",
      maxAge:
        7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json(
      new ApiResponse(
        200,
        "Login successful",
        {
          user,
        }
      )
    );
  }
);

const logout = asyncHandler(
  async (req, res) => {
    const isProduction =
      process.env.NODE_ENV === "production";

    res.clearCookie("token", {
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction
        ? "none"
        : "lax",
    });

    res.status(200).json(
      new ApiResponse(
        200,
        "Logout successful"
      )
    );
  }
);

const getCurrentUser =
  asyncHandler(
    async (req, res) => {
      const user =
        await User.findById(
          req.user.id
        );

      res.status(200).json(
        new ApiResponse(
          200,
          "Current user fetched",
          user
        )
      );
    }
  );



export {
  register,
  login,
  logout,
  getCurrentUser,
};