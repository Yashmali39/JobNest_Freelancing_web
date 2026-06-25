import streamifier from "streamifier";

import cloudinary from "../../config/cloudinary.js";

import asyncHandler from "../../utils/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";

import extractPdfText from "../../utils/extractPdfText.js";

import Freelancer from "../freelancers/freelancer.model.js";

import {
  uploadResume,
  getResume,
} from "./resume.service.js";


const getResumeTextController =
  asyncHandler(
    async (req, res) => {
      const freelancer =
        await Freelancer.findOne({
          userId:
            req.user.id,
        });

      res.status(200).json({
        resumeText:
          freelancer.resumeText,
      });
    }
  );

const uploadResumeController =
  asyncHandler(async (req, res) => {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message:
          "Resume file is required",
      });
    }

    // Extract text from PDF

    
    const extractedText =
      await extractPdfText(
        req.file.buffer
      );

    const uploadStream =
      cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",

          folder:
            "jobnest/resumes",
        },

        async (
          error,
          result
        ) => {
          if (error) {
            return res
              .status(500)
              .json({
                success: false,
                message:
                  "Cloudinary upload failed",
              });
          }

          const freelancer =
            await uploadResume(
              req.user.id,
              result.secure_url,
              extractedText
            );

          res.status(200).json(
            new ApiResponse(
              200,
              "Resume uploaded successfully",
              freelancer
            )
          );
        }
      );

    streamifier
      .createReadStream(
        req.file.buffer
      )
      .pipe(uploadStream);
  });

const getResumeController =
  asyncHandler(
    async (req, res) => {
      const resume =
        await getResume(
          req.user.id
        );

      res.status(200).json(
        new ApiResponse(
          200,
          "Resume fetched successfully",
          {
            resumeUrl:
              resume,
          }
        )
      );
    }
  );

export {
  getResumeTextController,
  uploadResumeController,
  getResumeController,
};