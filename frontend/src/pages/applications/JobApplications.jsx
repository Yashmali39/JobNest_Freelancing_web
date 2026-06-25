import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import {
    getApplicantsForJob,
} from "../../api/application.api";

import ApplicantCard from "../../components/applications/ApplicantCard";

import toast from "react-hot-toast";

import Loader from "../../components/common/Loader";
import EmptyState from "../../components/common/EmptyState";

function JobApplications() {
    const { jobId } =
        useParams();

    const [
        applicants,
        setApplicants,
    ] = useState([]);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const fetchApplicants =
        async () => {
            try {
                const res =
                    await getApplicantsForJob(
                        jobId
                    );

                setApplicants(
                    res.data.data
                );
            } catch (
            error
            ) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to load applicants"
                );
            } finally {
                setLoading(false);
            }
        };

    useEffect(() => {
        fetchApplicants();
    }, []);

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Applicants
                </h1>

                <p className="text-gray-400 mt-2">
                    Review freelancers who applied for this job.
                </p>

            </div>

            {applicants.length === 0 ? (

                <EmptyState
                    title="No Applicants Yet"
                    description="Applications will appear here when freelancers apply."
                />

            ) : (

                <div className="space-y-5">

                    {applicants.map(
                        (
                            application
                        ) => (
                            <ApplicantCard
                                key={
                                    application._id
                                }
                                application={
                                    application
                                }
                                refresh={
                                    fetchApplicants
                                }
                            />
                        )
                    )}

                </div>

            )}

        </div>
    );
}

export default JobApplications;