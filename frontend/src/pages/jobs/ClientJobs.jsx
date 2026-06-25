import {
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    getMyJobs,
    deleteJob,
} from "../../api/job.api";

import JobCard from "../../components/jobs/JobCard";

import Loader from "../../components/common/Loader";

import EmptyState from "../../components/common/EmptyState";

import toast from "react-hot-toast";
import Button from "../../components/common/Button";

function ClientJobs() {
    const [jobs, setJobs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const fetchJobs =
        async () => {
            try {
                const res =
                    await getMyJobs();

                setJobs(
                    res.data.data
                );
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to load jobs"
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchJobs();
    }, []);

    const handleDelete =
        async (id) => {
            try {
                await deleteJob(
                    id
                );

                toast.success(
                    "Job Deleted Successfully"
                );


                fetchJobs();
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to delete job"
                );
            }
        };

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-4xl font-bold text-white">
                        My Jobs
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Manage and track all your job postings.
                    </p>
                </div>

                <Link
                    to="/jobs/create"
                >
                    <Button>
                        Create New Job
                    </Button>
                </Link>
            </div>

            {jobs.length ===
                0 ? (
                <EmptyState
                    title="No Jobs Yet"
                    description="Create your first job posting."
                />
            ) : (
                <div className="space-y-4">
                    {jobs.map(
                        (job) => (
                            <JobCard
                                key={
                                    job._id
                                }
                                job={job}
                                onDelete={
                                    handleDelete
                                }
                            />
                        )
                    )}
                </div>
            )}
        </div>
    );
}

export default ClientJobs;