import api from "./axios";

export const switchRole =
  (role) =>
    api.patch(
      "/users/switch-role",
      { role }
    );