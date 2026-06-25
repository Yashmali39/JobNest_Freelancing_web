import {
    updateApplicationStatus,
} from "../../api/application.api";

import toast from "react-hot-toast";

import Card from "../common/Card";
import Button from "../common/Button";

import StatusBadge from "./StatusBadge";

import { Link } from "react-router-dom";

function ApplicantCard({
    application,
    refresh,
}) {
    const handleStatus =
        async (status) => {
            try {
                await updateApplicationStatus(
                    application._id,
                    status
                );

                toast.success(
                    `Application ${status}`
                );

                refresh();
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to update application"
                );
            }
        };

    return (
        <Card>

            {/* Header */}

            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

                <div>

                    <h2 className="text-2xl font-semibold text-white">
                        {application.freelancerId?.title}
                    </h2>

                    <p className="text-gray-400 mt-1">
                        Freelancer Application
                    </p>

                    <div className="mt-3">
                        <Link
                            to={`/freelancers/${application.freelancerId?._id}`}
                        >
                            <Button
                                variant="secondary"
                            >
                                View Profile
                            </Button>
                        </Link>
                    </div>

                </div>

                <StatusBadge
                    status={application.status}
                />

            </div>

            {/* Cover Letter */}

            <div className="mt-6">

                <h3 className="text-lg font-medium text-white mb-3">
                    Cover Letter
                </h3>

                <div
                    className="
          border
          border-[#262626]
          rounded-xl
          p-4
          bg-[#0D0D0D]
          max-h-[250px]
          overflow-y-auto
        "
                >

                    <p className="text-gray-300 whitespace-pre-wrap">
                        {
                            application.coverLetter
                        }
                    </p>

                </div>

            </div>

            {/* Actions */}

            {application.status ===
                "pending" && (
                    <div className="flex flex-wrap gap-3 mt-6">

                        <Button
                            onClick={() =>
                                handleStatus(
                                    "accepted"
                                )
                            }
                        >
                            Accept
                        </Button>

                        <Button
                            variant="danger"
                            onClick={() =>
                                handleStatus(
                                    "rejected"
                                )
                            }
                        >
                            Reject
                        </Button>

                    </div>
                )}

            

        </Card>
    );
}

export default ApplicantCard;