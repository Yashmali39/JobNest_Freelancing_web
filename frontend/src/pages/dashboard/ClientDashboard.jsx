import {
  useEffect,
  useState,
} from "react";

import {
  getMyJobs,
} from "../../api/job.api";

import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";

function ClientDashboard() {
  const [jobs, setJobs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const fetchData =
      async () => {
        try {
          const res =
            await getMyJobs();

          setJobs(
            res.data.data
          );
        } catch (error) {
          console.log(error);
        } finally {
          setLoading(false);
        }
      };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const totalJobs =
    jobs.length;

  const openJobs =
    jobs.filter(
      (job) =>
        job.status ===
        "open"
    ).length;

  const closedJobs =
    jobs.filter(
      (job) =>
        job.status ===
        "closed"
    ).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-white">
          Client Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your jobs and track hiring activity.
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <Card>
          <p className="text-gray-400">
            Total Jobs
          </p>

          <h2 className="text-4xl font-bold text-white mt-2">
            {totalJobs}
          </h2>
        </Card>

        <Card>
          <p className="text-gray-400">
            Open Jobs
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            {openJobs}
          </h2>
        </Card>

        <Card>
          <p className="text-gray-400">
            Closed Jobs
          </p>

          <h2 className="text-4xl font-bold text-red-400 mt-2">
            {closedJobs}
          </h2>
        </Card>

      </div>

      {/* Recent Jobs */}

      <Card>

        <h2 className="text-2xl font-semibold text-white mb-6">
          Recent Jobs
        </h2>

        <div className="space-y-4">

          {jobs
            .slice(0, 5)
            .map((job) => (
              <div
                key={job._id}
                className="
                  flex
                  justify-between
                  items-center
                  border-b
                  border-[#262626]
                  pb-3
                "
              >
                <div>

                  <h3 className="text-white font-medium">
                    {job.title}
                  </h3>

                  <p className="text-gray-400 text-sm">
                    ₹{job.budget}
                  </p>

                </div>

                <span
                  className={`
                    px-3
                    py-1
                    rounded-full
                    text-sm
                    ${
                      job.status ===
                      "open"
                        ? "bg-green-500/10 text-green-400"
                        : "bg-red-500/10 text-red-400"
                    }
                  `}
                >
                  {job.status}
                </span>

              </div>
            ))}

        </div>

      </Card>

    </div>
  );
}

export default ClientDashboard;