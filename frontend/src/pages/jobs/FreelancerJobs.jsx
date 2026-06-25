import {
    useEffect,
    useState,
} from "react";

import {
    Link,
} from "react-router-dom";

import {
    getAllJobs,
} from "../../api/job.api";

import Loader
    from "../../components/common/Loader";

import toast from "react-hot-toast";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import EmptyState from "../../components/common/EmptyState";

function FreelancerJobs() {

    const [search, setSearch] =
        useState("");

    const [
        experienceFilter,
        setExperienceFilter,
    ] = useState("");

    const [
        budgetFilter,
        setBudgetFilter,
    ] = useState("");

    const [page, setPage] =
        useState(1);

    const [totalPages,
        setTotalPages] =
        useState(1);

    const [jobs, setJobs] =
        useState([]);

    const [loading, setLoading] =
        useState(true);

    const fetchJobs =
        async () => {
            try {
                const res =
                    await getAllJobs(
                        page,
                        10
                    );

                const result =
                    res.data.data;

                setJobs(
                    result.jobs
                );

                setTotalPages(
                    result.pages
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
    }, [page]);

    const filteredJobs =
        jobs.filter((job) => {

            const query =
                search.toLowerCase();

            const matchesSearch =
                job.title
                    ?.toLowerCase()
                    .includes(query) ||

                job.description
                    ?.toLowerCase()
                    .includes(query) ||

                job.skillsRequired?.some(
                    (skill) =>
                        skill
                            .toLowerCase()
                            .includes(query)
                );

            const matchesExperience =
                !experienceFilter ||
                job.experienceLevel ===
                experienceFilter;

            const matchesBudget =
                !budgetFilter ||

                (
                    budgetFilter ===
                    "low" &&
                    job.budget < 10000
                ) ||

                (
                    budgetFilter ===
                    "medium" &&
                    job.budget >= 10000 &&
                    job.budget <= 50000
                ) ||

                (
                    budgetFilter ===
                    "high" &&
                    job.budget > 50000
                );

            return (
                matchesSearch &&
                matchesExperience &&
                matchesBudget
            );
        });

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="max-w-6xl mx-auto px-6 py-8">

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Available Jobs
                </h1>

                <p className="text-gray-400 mt-2">
                    Browse and apply for opportunities.
                </p>

            </div>

            {/* Search */}

            <Card className="mb-6">

                <div className="grid md:grid-cols-3 gap-4">

                    <Input
                        placeholder="Search jobs..."
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                    />

                    <select
                        value={
                            experienceFilter
                        }
                        onChange={(e) =>
                            setExperienceFilter(
                                e.target.value
                            )
                        }
                        className="
        bg-[#111111]
        border
        border-[#262626]
        rounded-xl
        px-4
        py-3
        text-white
      "
                    >
                        <option value="">
                            All Experience
                        </option>

                        <option value="Entry">
                            Entry
                        </option>

                        <option value="Intermediate">
                            Intermediate
                        </option>

                        <option value="Expert">
                            Expert
                        </option>

                    </select>

                    <select
                        value={
                            budgetFilter
                        }
                        onChange={(e) =>
                            setBudgetFilter(
                                e.target.value
                            )
                        }
                        className="
        bg-[#111111]
        border
        border-[#262626]
        rounded-xl
        px-4
        py-3
        text-white
      "
                    >
                        <option value="">
                            All Budgets
                        </option>

                        <option value="low">
                            Below ₹10,000
                        </option>

                        <option value="medium">
                            ₹10,000 - ₹50,000
                        </option>

                        <option value="high">
                            Above ₹50,000
                        </option>

                    </select>

                </div>

            </Card>

            {/* Jobs */}

            {filteredJobs.length === 0 ? (
                <EmptyState
                    title="No Jobs Found"
                    description="Try another keyword."
                />
            ) : (
                <div className="space-y-5">

                    {filteredJobs.map(
                        (job) => (
                            <Card
                                key={job._id}
                            >

                                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">

                                    <div className="flex-1">

                                        <h2 className="text-2xl font-semibold text-white">
                                            {job.title}
                                        </h2>

                                        <p className="text-gray-400 text-sm mt-1">
                                            {
                                                job.experienceLevel
                                            } Level
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
                                            w-fit
                                        "
                                    >
                                        ₹{job.budget}
                                    </div>

                                </div>

                                <p className="text-gray-300 mt-4">
                                    {job.description.slice(
                                        0,
                                        150
                                    )}
                                    ...
                                </p>

                                {job.skillsRequired
                                    ?.length >
                                    0 && (
                                        <div className="flex flex-wrap gap-2 mt-4">

                                            {job.skillsRequired.map(
                                                (
                                                    skill
                                                ) => (
                                                    <span
                                                        key={
                                                            skill
                                                        }
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

                                <div className="mt-5">

                                    <Link
                                        to={`/jobs/${job._id}`}
                                    >
                                        <Button>
                                            View Details
                                        </Button>
                                    </Link>

                                </div>

                            </Card>
                        )
                    )}

                </div>
            )}

            {/* Pagination */}

            <div className="flex justify-center items-center gap-4 mt-8">

                <Button
                    variant="secondary"
                    disabled={
                        page === 1
                    }
                    onClick={() =>
                        setPage(
                            page - 1
                        )
                    }
                >
                    Previous
                </Button>

                <span className="text-gray-300">
                    Page {page} of{" "}
                    {totalPages}
                </span>

                <Button
                    variant="secondary"
                    disabled={
                        page ===
                        totalPages
                    }
                    onClick={() =>
                        setPage(
                            page + 1
                        )
                    }
                >
                    Next
                </Button>

            </div>

        </div>
    );
}

export default FreelancerJobs;