import mongoose from "mongoose";

const freelancerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    bio: {
      type: String,
      required: true,
      trim: true,
    },

    skills: [
      {
        type: String,
        trim: true,
      },
    ],

    experience: {
      type: Number,
      default: 0,
    },

    hourlyRate: {
      type: Number,
      default: 0,
    },

    portfolioLinks: [
      {
        type: String,
      },
    ],

    
    resumeUrl: {
      type: String,
      default: "",
    },
    
    resumeText: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const Freelancer = mongoose.model(
  "Freelancer",
  freelancerSchema
);

export default Freelancer;