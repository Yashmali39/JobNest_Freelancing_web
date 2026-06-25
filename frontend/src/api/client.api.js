import api from "./axios";

export const createClientProfile =
  (data) =>
    api.post(
      "/clients/profile",
      data
    );

export const getClientProfile =
  () =>
    api.get(
      "/clients/me"
    );

export const updateClientProfile =
  (data) =>
    api.put(
      "/clients/me",
      data
    );