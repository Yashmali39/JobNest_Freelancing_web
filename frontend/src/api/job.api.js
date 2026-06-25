import api from "./axios";

export const createJob =
  (data) =>
    api.post(
      "/jobs",
      data
    );

export const getMyJobs =
  () =>
    api.get(
      "/jobs/my-jobs"
    );

export const updateJob = (
  id,
  data
) =>
  api.put(
    `/jobs/${id}`,
    data
  );

export const getJobById =
  (id) =>
    api.get(
      `/jobs/${id}`
    );


export const getAllJobs = (
  page = 1,
  limit = 10,
  keyword = ""
) =>
  api.get(
    `/jobs?page=${page}&limit=${limit}&keyword=${keyword}`
  );

  
export const deleteJob =
  (id) =>
    api.delete(
      `/jobs/${id}`
    );