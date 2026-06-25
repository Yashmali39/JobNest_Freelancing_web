import api from "./axios";

export const createFreelancerProfile =
  (data) =>
    api.post(
      "/freelancers/profile",
      data
    );

export const getFreelancerProfile =
  () =>
    api.get(
      "/freelancers/me"
    );

export const updateFreelancerProfile =
  (data) =>
    api.put(
      "/freelancers/me",
      data
    );

export const getFreelancerById =
  (id) =>
    api.get(
      `/freelancers/${id}`
    );

export const getAllFreelancers =
  () =>
    api.get("/freelancers");