import jwt from "jsonwebtoken";

import ApiError from "../utils/ApiError.js";

const protect = (
  req,
  res,
  next
) => {
  try {
    const token =
      req.cookies.token;

    if (!token) {
      throw new ApiError(
        401,
        "Not authorized"
      );
    }

    const decoded =
      jwt.verify(
        token,
        process.env.JWT_SECRET
      );

    req.user = {
      id: decoded.id,
    };

    next();
  } catch (error) {
    next(error);
  }
};

export default protect;