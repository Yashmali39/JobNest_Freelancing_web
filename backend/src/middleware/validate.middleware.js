const validate = (schema) => {
  return (req, res, next) => {
    try {
      req.body = schema.parse(req.body);

      next();
    } catch (error) {
      return res.status(400).json({
        success: false,
        message: "Validation Error",
        errors: error.errors?.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        })),
      });
    }
  };
};

export default validate;



