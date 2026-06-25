import User from "../modules/users/user.model.js";
import ApiError from "../utils/ApiError.js";

const authorize = (...roles) => {
  return async (
    req,
    res,
    next
  ) => {
    const user =
      await User.findById(
        req.user.id
      );

    if (!user) {
      return next(
        new ApiError(
          404,
          "User not found"
        )
      );
    }

    if (
      !roles.includes(
        user.activeRole
      )
    ) {
      return next(
        new ApiError(
          403,
          "Access denied"
        )
      );
    }

    next();
  };
};

export default authorize;