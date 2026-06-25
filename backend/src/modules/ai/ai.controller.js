import asyncHandler from "../../utils/asyncHandler.js";

import ApiResponse from "../../utils/ApiResponse.js";

import {
  generateJobDescription,
  calculateJobMatch,
  generateProposal,
} from "./ai.service.js";

const generateJobDescriptionController =
  asyncHandler(
    async (req, res) => {
      const description =
        await generateJobDescription(
          req.body
        );

      res.status(200).json(
        new ApiResponse(
          200,
          "Job description generated",
          {
            description,
          }
        )
      );
    }
  );

const calculateJobMatchController =
  asyncHandler(
    async (req, res) => {
      const result =
        await calculateJobMatch(
          req.user.id,
          req.params.jobId
        );

      res.status(200).json(
        new ApiResponse(
          200,
          "Job match calculated",
          result
        )
      );
    }
  );

const generateProposalController =
  asyncHandler(
    async (req, res) => {
      const result =
        await generateProposal(
          req.user.id,
          req.params.jobId,
          req.body
            .additionalNote
        );

      res.status(200).json(
        new ApiResponse(
          200,
          "Proposal generated successfully",
          result
        )
      );
    }
  );

export {
  generateJobDescriptionController,
  calculateJobMatchController,
  generateProposalController,
};