import {
    useEffect,
    useState,
} from "react";

import {
    getMyApplications,
    withdrawApplication,
} from "../../api/application.api";

import toast from "react-hot-toast";

import Loader from "../../components/common/Loader";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import EmptyState from "../../components/common/EmptyState";

import StatusBadge from "../../components/applications/StatusBadge";

function MyApplications() {
    const [
        applications,
        setApplications,
    ] = useState([]);

    const fetchApplications =
        async () => {
            try {
                const res =
                    await getMyApplications();

                setApplications(
                    res.data.data
                );
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Something went wrong"
                );
            }
        };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleWithdraw =
        async (id) => {
            try {
                await withdrawApplication(
                    id
                );

                fetchApplications();
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to withdraw application"
                );
            }
        };

    return (
    <div className="max-w-6xl mx-auto px-6 py-8">

        {/* Header */}

        <div className="mb-8">

            <h1 className="text-3xl md:text-4xl font-bold text-white">
                My Applications
            </h1>

            <p className="text-gray-400 mt-2">
                Track all jobs you've applied for.
            </p>

        </div>

        {applications.length === 0 ? (

            <EmptyState
                title="No Applications Yet"
                description="Apply to jobs to see them here."
            />

        ) : (

            <div className="space-y-5">

                {applications.map(
                    (
                        application
                    ) => (
                        <Card
                            key={
                                application._id
                            }
                        >

                            <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

                                <div>

                                    <h2 className="text-2xl font-semibold text-white">
                                        {
                                            application
                                                .jobId
                                                ?.title
                                        }
                                    </h2>

                                    <p className="text-gray-400 mt-2">
                                        Application Status
                                    </p>

                                </div>

                                <StatusBadge
                                    status={
                                        application.status
                                    }
                                />

                            </div>

                            {application.coverLetter && (
                                <div className="mt-5">

                                    <h3 className="text-lg font-medium text-white mb-2">
                                        Proposal
                                    </h3>

                                    <div
                                        className="
                                            border
                                            border-[#262626]
                                            rounded-xl
                                            p-4
                                            bg-[#0D0D0D]
                                            max-h-[200px]
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
                            )}

                            {application.status ===
                                "pending" && (
                                    <div className="mt-5">

                                        <Button
                                            onClick={() =>
                                                handleWithdraw(
                                                    application._id
                                                )
                                            }
                                        >
                                            Withdraw Application
                                        </Button>

                                    </div>
                                )}

                        </Card>
                    )
                )}

            </div>
        )}

    </div>
);
}

export default MyApplications;