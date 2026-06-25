import api from "./axios";

export const uploadResume =
  (formData) =>
    api.post(
      "/resumes/upload",
      formData,
      {
        headers: {
          "Content-Type":
            "multipart/form-data",
        },
      }
    );