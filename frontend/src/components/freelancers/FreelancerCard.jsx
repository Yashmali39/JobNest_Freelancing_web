import {
  Link,
} from "react-router-dom";

import Card from "../common/Card";

import Button from "../common/Button";

function FreelancerCard({
  freelancer,
}) {
  return (
    <Card>


      <h2 className="text-2xl font-semibold text-white">
        {freelancer.userId?.name}
      </h2>

      <p className="text-gray-400 mt-1">
        {freelancer.title}
      </p>

      <p className="text-gray-400 mt-3 line-clamp-3">
        {freelancer.bio}
      </p>

      <div className="flex flex-wrap gap-2 mt-4">

        {freelancer.skills
          ?.slice(0, 4)
          .map(
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

      <div className="mt-5 space-y-2">

        <p className="text-gray-300">
          Experience:
          {" "}
          <span className="text-white">
            {
              freelancer.experience
            } Years
          </span>
        </p>

        <p className="text-gray-300">
          Hourly Rate:
          {" "}
          <span className="text-green-400">
            ₹
            {
              freelancer.hourlyRate
            }
            /hr
          </span>
        </p>

      </div>

      <div className="mt-6">

        <Link
          to={`/freelancers/${freelancer._id}`}
        >
          <Button
            variant="secondary"
            className="w-full"
          >
            View Profile
          </Button>
        </Link>

      </div>

    </Card>
  );
}

export default FreelancerCard;