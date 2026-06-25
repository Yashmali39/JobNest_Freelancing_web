import api from "./axios";

export const applyToJob =
  (data) =>
    api.post(
      "/applications",
      data
    );

export const getMyApplications =
  () =>
    api.get(
      "/applications/my"
    );

export const withdrawApplication =
  (id) =>
    api.delete(
      `/applications/${id}`
    );

export const getApplicantsForJob =
  (jobId) =>
    api.get(
      `/applications/job/${jobId}`
    );

export const updateApplicationStatus =
  (id, status) =>
    api.patch(
      `/applications/${id}/status`,
      { status }
    );