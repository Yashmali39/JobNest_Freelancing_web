import {
  useEffect,
  useState,
} from "react";

import {
  getMyApplications,
} from "../../api/application.api";

import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";

function FreelancerDashboard() {
  const [
    applications,
    setApplications,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  useEffect(() => {
    const fetchData =
      async () => {
        try {
          const res =
            await getMyApplications();

          setApplications(
            res.data.data
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    fetchData();
  }, []);

  if (loading) {
    return <Loader />;
  }

  const total =
    applications.length;

  const accepted =
    applications.filter(
      (
        application
      ) =>
        application.status ===
        "accepted"
    ).length;

  const pending =
    applications.filter(
      (
        application
      ) =>
        application.status ===
        "pending"
    ).length;

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-white">
          Freelancer Dashboard
        </h1>

        <p className="text-gray-400 mt-2">
          Track your job applications and opportunities.
        </p>

      </div>

      {/* Stats */}

      <div className="grid md:grid-cols-3 gap-6 mb-8">

        <Card>
          <p className="text-gray-400">
            Applications
          </p>

          <h2 className="text-4xl font-bold text-white mt-2">
            {total}
          </h2>
        </Card>

        <Card>
          <p className="text-gray-400">
            Accepted
          </p>

          <h2 className="text-4xl font-bold text-green-400 mt-2">
            {accepted}
          </h2>
        </Card>

        <Card>
          <p className="text-gray-400">
            Pending
          </p>

          <h2 className="text-4xl font-bold text-yellow-400 mt-2">
            {pending}
          </h2>
        </Card>

      </div>

      {/* Recent Applications */}

      <Card>

        <h2 className="text-2xl font-semibold text-white mb-6">
          Recent Applications
        </h2>

        <div className="space-y-4">

          {applications
            .slice(0, 5)
            .map(
              (
                application
              ) => (
                <div
                  key={
                    application._id
                  }
                  className="
                    flex
                    justify-between
                    border-b
                    border-[#262626]
                    pb-3
                  "
                >
                  <span className="text-white">
                    {
                      application
                        .jobId
                        ?.title
                    }
                  </span>

                  <span className="text-gray-400">
                    {
                      application.status
                    }
                  </span>
                </div>
              )
            )}

        </div>

      </Card>

    </div>
  );
}

export default FreelancerDashboard;