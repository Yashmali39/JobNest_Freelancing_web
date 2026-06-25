import { Link } from "react-router-dom";

import Card from "../common/Card";
import Button from "../common/Button";

function JobCard({
    job,
    onDelete,
}) {
    return (
  <Card>

    {/* Header */}

    <div className="flex justify-between items-start mb-4">

      <div>
        <h2 className="text-2xl font-semibold text-white">
          {job.title}
        </h2>

        <p className="text-gray-400 text-sm mt-1">
          {job.experienceLevel} Level
        </p>
      </div>

      <div
        className="
          px-3
          py-1
          rounded-full
          bg-green-500/10
          text-green-400
          text-sm
        "
      >
        ₹{job.budget}
      </div>

    </div>

    {/* Description */}

    <p className="text-gray-300 leading-relaxed mb-5">
      {job.description.slice(
        0,
        150
      )}
      ...
    </p>

    {/* Skills */}

    {job.skillsRequired?.length >
      0 && (
      <div className="flex flex-wrap gap-2 mb-5">

        {job.skillsRequired.map(
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
    )}

    {/* Footer */}

    <div className="flex flex-wrap gap-3">

      <Link
        to={`/jobs/edit/${job._id}`}
      >
        <Button
          variant="secondary"
        >
          Edit
        </Button>
      </Link>

      <Button
        variant="danger"
        onClick={() =>
          onDelete(
            job._id
          )
        }
      >
        Delete
      </Button>

      <Link
        to={`/jobs/${job._id}/applications`}
      >
        <Button>
          Applications
        </Button>
      </Link>

    </div>

  </Card>
);
}

export default JobCard;