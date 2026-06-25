import mongoose from "mongoose";

const applicationSchema =
  new mongoose.Schema(
    {
      jobId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true,
      },

      freelancerId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Freelancer",
        required: true,
      },

      coverLetter: {
        type: String,
        required: true,
        trim: true,
      },

      status: {
        type: String,
        enum: [
          "pending",
          "accepted",
          "rejected",
        ],
        default: "pending",
      },
    },
    {
      timestamps: true,
    }
  );

const Application =
  mongoose.model(
    "Application",
    applicationSchema
  );

export default Application;