import {
    useState,
} from "react";

import {
    getJobMatch,
} from "../../api/ai.api";

import toast from "react-hot-toast";

import Button from "../common/Button";

function JobMatchScore({
    jobId,
}) {
    const [result, setResult] =
        useState(null);

    const [loading,
        setLoading] =
        useState(false);

    const handleAnalyze =
        async () => {
            try {
                setLoading(true);

                const res =
                    await getJobMatch(
                        jobId
                    );

                setResult(
                    res.data.data
                );
            } catch (
            error
            ) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to analyze job match"
                );
            } finally {
                setLoading(false);
            }
        };

    return (
  <div>

    {/* Header */}

    <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">

      <div>

        <h2 className="text-2xl font-bold text-white">
          AI Job Match
        </h2>

        <p className="text-gray-400 mt-1">
          Analyze how well your profile matches this job.
        </p>

      </div>

      <Button
        onClick={handleAnalyze}
        disabled={loading}
      >
        {loading
          ? "Analyzing..."
          : "Analyze Match"}
      </Button>

    </div>

    {result && (
      <div className="space-y-6">

        {/* Match Score */}

        <div
          className="
            border
            border-[#262626]
            rounded-xl
            p-6
            bg-[#0D0D0D]
          "
        >

          <p className="text-gray-400 text-sm">
            Match Score
          </p>

          <h3
            className={`
              text-5xl
              font-bold
              mt-2
              ${
                result.matchScore >= 80
                  ? "text-green-400"
                  : result.matchScore >= 60
                  ? "text-yellow-400"
                  : "text-red-400"
              }
            `}
          >
            {result.matchScore}%
          </h3>

        </div>

        {/* Skills Grid */}

        <div className="grid md:grid-cols-2 gap-6">

          {/* Matched Skills */}

          <div
            className="
              border
              border-[#262626]
              rounded-xl
              p-5
              bg-[#0D0D0D]
            "
          >

            <h3 className="text-lg font-semibold text-green-400 mb-4">
              Matched Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {result.matchedSkills?.length >
              0 ? (
                result.matchedSkills.map(
                  (skill) => (
                    <span
                      key={skill}
                      className="
                        px-3
                        py-1
                        rounded-full
                        bg-green-500/10
                        text-green-400
                        text-sm
                      "
                    >
                      {skill}
                    </span>
                  )
                )
              ) : (
                <p className="text-gray-500">
                  No matched skills found
                </p>
              )}

            </div>

          </div>

          {/* Missing Skills */}

          <div
            className="
              border
              border-[#262626]
              rounded-xl
              p-5
              bg-[#0D0D0D]
            "
          >

            <h3 className="text-lg font-semibold text-red-400 mb-4">
              Missing Skills
            </h3>

            <div className="flex flex-wrap gap-2">

              {result.missingSkills?.length >
              0 ? (
                result.missingSkills.map(
                  (skill) => (
                    <span
                      key={skill}
                      className="
                        px-3
                        py-1
                        rounded-full
                        bg-red-500/10
                        text-red-400
                        text-sm
                      "
                    >
                      {skill}
                    </span>
                  )
                )
              ) : (
                <p className="text-gray-500">
                  No missing skills
                </p>
              )}

            </div>

          </div>

        </div>

        {/* Recommendation */}

        <div
          className="
            border
            border-[#262626]
            rounded-xl
            p-5
            bg-[#0D0D0D]
          "
        >

          <h3 className="text-lg font-semibold text-white mb-3">
            Recommendation
          </h3>

          <p className="text-gray-300 leading-relaxed">
            {result.recommendation}
          </p>

        </div>

      </div>
    )}

  </div>
);
}

export default JobMatchScore;