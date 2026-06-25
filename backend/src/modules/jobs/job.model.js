import mongoose from "mongoose";

const jobSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
      trim: true,
    },

    skillsRequired: [
      {
        type: String,
        trim: true,
      },
    ],

    budget: {
      type: Number,
      required: true,
    },

    experienceLevel: {
      type: String,
      enum: [
        "Entry",
        "Intermediate",
        "Expert",
      ],
      default: "Entry",
    },

    status: {
      type: String,
      enum: [
        "open",
        "closed",
      ],
      default: "open",
    },
  },
  {
    timestamps: true,
  }
);

const Job = mongoose.model(
  "Job",
  jobSchema
);

export default Job;