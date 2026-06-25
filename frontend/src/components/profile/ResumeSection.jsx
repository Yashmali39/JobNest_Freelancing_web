import {
  useEffect,
  useState,
} from "react";

import {
  getFreelancerProfile,
} from "../../api/freelancer.api";

import ResumeUpload from "./ResumeUpload";

import Loader from "../common/Loader";

function ResumeSection() {
  const [
    profile,
    setProfile,
  ] = useState(null);

  const fetchProfile =
    async () => {
      const res =
        await getFreelancerProfile();

      setProfile(
        res.data.data
      );
    };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (!profile) {
    return <Loader />;
  }

  return (
    <div>

      {/* Header */}

      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-4">

          <div
            className="
              h-12
              w-12
              rounded-xl
              bg-blue-500/10
              flex
              items-center
              justify-center
              text-2xl
            "
          >
            📄
          </div>

          <div>
            <h2 className="text-2xl font-semibold text-white">
              Resume
            </h2>

            <p className="text-gray-400 text-sm">
              Your uploaded resume and summary
            </p>
          </div>

        </div>

        {profile.resumeUrl && (
          <span
            className="
              px-4
              py-2
              rounded-full
              bg-green-500/10
              text-green-400
              text-sm
            "
          >
            ✓ Resume Uploaded
          </span>
        )}

      </div>

      {/* Resume Preview */}

      {profile.resumeUrl ? (
        <>
          <div
            className="
              border
              border-[#262626]
              rounded-xl
              p-5
              bg-[#0D0D0D]
              mb-6
            "
          >

            <h3 className="text-lg font-medium text-white mb-4">
              Resume Preview
            </h3>

            <div
              className="
                max-h-[350px]
                overflow-y-auto
                rounded-lg
                border
                border-[#262626]
                bg-black
                p-4
              "
            >

              <pre
                className="
                  text-gray-300
                  text-sm
                  whitespace-pre-wrap
                  font-mono
                "
              >
                {profile.resumeText}
              </pre>

            </div>

          </div>
        </>
      ) : (
        <div
          className="
            border
            border-dashed
            border-[#262626]
            rounded-xl
            p-8
            text-center
            mb-6
          "
        >
          <p className="text-gray-400">
            No resume uploaded yet
          </p>
        </div>
      )}

      {/* Upload Section */}

      <div
        className="
          border-2
          border-dashed
          border-[#262626]
          rounded-xl
          p-6
        "
      >

        <div className="mb-4">

          <h3 className="text-lg font-medium text-white">
            Upload New Resume
          </h3>

          <p className="text-gray-400 text-sm mt-1">
            Upload your latest resume to improve AI job matching.
          </p>

        </div>

        <ResumeUpload
          onSuccess={
            fetchProfile
          }
        />

      </div>

    </div>
  );
}

export default ResumeSection;