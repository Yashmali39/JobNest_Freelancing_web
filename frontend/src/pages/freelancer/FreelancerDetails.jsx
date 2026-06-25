import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import {
  getFreelancerById,
} from "../../api/freelancer.api";

import Loader from "../../components/common/Loader";

import Card from "../../components/common/Card";

import toast from "react-hot-toast";

function FreelancerDetails() {
  const { id } =
    useParams();

  const [
    freelancer,
    setFreelancer,
  ] = useState(null);

  useEffect(() => {
    const fetchFreelancer =
      async () => {
        try {
          const res =
            await getFreelancerById(
              id
            );

          setFreelancer(
            res.data.data
          );
        } catch (
        error
        ) {
          toast.error(
            error.response?.data
              ?.message ||
            "Failed to load freelancer"
          );
        }
      };

    fetchFreelancer();
  }, [id]);

  if (!freelancer) {
    return <Loader />;
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-8">

      {/* Header */}

      <Card className="mb-6">

        <p className="text-blue-400 text-sm mb-2">
          Freelancer
        </p>

        <h1 className="text-4xl font-bold text-white">
          {
            freelancer.userId?.name
          }
        </h1>

        <h2 className="text-xl text-gray-400 mt-2">
          {
            freelancer.title
          }
        </h2>

        <p className="text-gray-300 mt-6">
          {
            freelancer.bio
          }
        </p>

      </Card>

      {/* Stats */}

      <div className="grid md:grid-cols-2 gap-6 mb-6">

        <Card>
          <p className="text-gray-400 text-sm">
            Experience
          </p>

          <h2 className="text-2xl font-semibold text-white mt-2">
            {
              freelancer.experience
            } Years
          </h2>
        </Card>

        <Card>
          <p className="text-gray-400 text-sm">
            Hourly Rate
          </p>

          <h2 className="text-2xl font-semibold text-white mt-2">
            ₹
            {
              freelancer.hourlyRate
            }
            /hr
          </h2>
        </Card>

      </div>

      {/* Skills */}

      <Card className="mb-6">

        <h2 className="text-xl font-semibold text-white mb-4">
          Skills
        </h2>

        <div className="flex flex-wrap gap-2">

          {freelancer.skills?.map(
            (skill) => (
              <span
                key={skill}
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-blue-500/10
                  text-blue-400
                  text-sm
                "
              >
                {skill}
              </span>
            )
          )}

        </div>

      </Card>

      {/* Portfolio */}

      <Card className="mb-6">

        <h2 className="text-xl font-semibold text-white mb-4">
          Portfolio
        </h2>

        <div className="space-y-2">

          {freelancer.portfolioLinks?.map(
            (link) => (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noreferrer"
                className="block text-blue-400 hover:text-blue-300"
              >
                {link}
              </a>
            )
          )}

        </div>

      </Card>

      {/* Resume */}

      {freelancer.resumeText && (
        <Card>

          <h2 className="text-xl font-semibold text-white mb-4">
            Resume
          </h2>

          <div
            className="
              max-h-[400px]
              overflow-y-auto
              border
              border-[#262626]
              rounded-xl
              p-4
              bg-[#0D0D0D]
            "
          >
            <pre className="whitespace-pre-wrap text-gray-300 text-sm">
              {
                freelancer.resumeText
              }
            </pre>
          </div>

        </Card>
      )}

    </div>
  );
}

export default FreelancerDetails;