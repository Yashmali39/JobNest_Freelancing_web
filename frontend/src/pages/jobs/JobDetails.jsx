import {
    useEffect,
    useState,
} from "react";

import { useAuth } from "../../context/AuthContext";


import { useParams } from "react-router-dom";

import { getJobById } from "../../api/job.api";

import ApplicationForm from "../../components/applications/ApplicationForm";

import JobMatchScore from "../../components/ai/JobMatchScore";

import toast from "react-hot-toast";

import Loader from "../../components/common/Loader";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";


function JobDetails() {

    const { user } = useAuth();

    const { id } =
        useParams();

    const [job, setJob] =
        useState(null);

    useEffect(() => {
        const fetchJob =
            async () => {
                try {
                    const res =
                        await getJobById(
                            id
                        );

                    setJob(
                        res.data.data
                    );
                } catch (error) {
                    toast.error(
                        error.response?.data?.message ||
                        "Something went wrong"
                    );
                }
            };

        fetchJob();
    }, [id]);

    if (!job) {
        return <Loader />;
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">

            {/* Job Header */}

            <Card className="mb-6">

                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

                    <div>

                        <h1 className="text-3xl md:text-4xl font-bold text-white">
                            {job.title}
                        </h1>

                        <p className="text-gray-400 mt-2">
                            {job.experienceLevel} Level
                        </p>

                    </div>

                    <div
                        className="
            px-4
            py-2
            rounded-full
            bg-green-500/10
            text-green-400
            text-lg
            font-semibold
            w-fit
          "
                    >
                        ₹{job.budget}
                    </div>

                </div>

            </Card>

            {/* Description */}

            <Card className="mb-6">

                <h2 className="text-xl font-semibold text-white mb-4">
                    Job Description
                </h2>

                <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                    {job.description}
                </p>

            </Card>

            {/* Skills */}

            <Card className="mb-6">

                <h2 className="text-xl font-semibold text-white mb-4">
                    Required Skills
                </h2>

                <div className="flex flex-wrap gap-3">

                    {job.skillsRequired?.map(
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

            {/* Freelancer Section */}

            {user?.activeRole ===
                "freelancer" && (
                    <div className="space-y-6">

                        <Card>
                            <JobMatchScore
                                jobId={job._id}
                            />
                        </Card>

                        <Card>
                            <ApplicationForm
                                jobId={job._id}
                            />
                        </Card>

                    </div>
                )}

        </div>
    );
}

export default JobDetails;