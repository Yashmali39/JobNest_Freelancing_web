import api from "./axios";

export const generateProposal =
  (
    jobId,
    additionalNote = ""
  ) =>
    api.post(
      `/ai/proposal/${jobId}`,
      {
        additionalNote,
      }
    );

export const getJobMatch =
  (jobId) =>
    api.post(
      `/ai/job-match/${jobId}`
    );

export const generateJobDescription =
  (data) =>
    api.post(
      "/ai/job-description",
      data
    );