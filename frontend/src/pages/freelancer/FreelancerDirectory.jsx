import {
  useEffect,
  useState,
} from "react";

import {
  getAllFreelancers,
} from "../../api/freelancer.api";

import FreelancerCard from "../../components/freelancers/FreelancerCard";

import Loader from "../../components/common/Loader";

import toast from "react-hot-toast";

function FreelancerDirectory() {
  const [
    freelancers,
    setFreelancers,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    search,
    setSearch,
  ] = useState("");

  useEffect(() => {
    const fetchFreelancers =
      async () => {
        try {
          const res =
            await getAllFreelancers();

          setFreelancers(
            res.data.data
          );
        } catch (error) {
          toast.error(
            error.response?.data
              ?.message ||
              "Failed to load freelancers"
          );
        } finally {
          setLoading(false);
        }
      };

    fetchFreelancers();
  }, []);

  const filteredFreelancers =
    freelancers.filter(
      (freelancer) => {
        const query =
          search.toLowerCase();

        return (
          freelancer.title
            ?.toLowerCase()
            .includes(query) ||
          freelancer.skills?.some(
            (skill) =>
              skill
                .toLowerCase()
                .includes(query)
          )
        );
      }
    );

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Header */}

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-white">
          Freelancers
        </h1>

        <p className="text-gray-400 mt-2">
          Browse talented professionals available for hire.
        </p>

      </div>

      {/* Search */}

      <div className="mb-8">

        <input
          type="text"
          placeholder="Search by title or skills..."
          value={search}
          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }
          className="
            w-full
            bg-[#111111]
            border
            border-[#262626]
            rounded-xl
            px-4
            py-3
            text-white
            placeholder:text-gray-500
            outline-none
            focus:border-blue-500
            transition-all
          "
        />

      </div>

      {/* Results */}

      {filteredFreelancers.length ===
      0 ? (
        <div
          className="
            bg-[#111111]
            border
            border-[#262626]
            rounded-2xl
            py-16
            text-center
          "
        >
          <h2 className="text-xl font-semibold text-white">
            No Freelancers Found
          </h2>

          <p className="text-gray-400 mt-2">
            Try searching with
            different skills or
            titles.
          </p>
        </div>
      ) : (
        <div
          className="
            grid
            md:grid-cols-2
            xl:grid-cols-3
            gap-6
          "
        >

          {filteredFreelancers.map(
            (freelancer) => (
              <FreelancerCard
                key={
                  freelancer._id
                }
                freelancer={
                  freelancer
                }
              />
            )
          )}

        </div>
      )}

    </div>
  );
}

export default FreelancerDirectory;