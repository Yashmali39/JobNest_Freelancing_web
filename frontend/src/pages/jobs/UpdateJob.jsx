import {
    useEffect,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    jobSchema,
} from "../../validations/job.schema";

import {
    getJobById,
    updateJob,
} from "../../api/job.api";

import toast from "react-hot-toast";

import Button from "../../components/common/Button";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";

function UpdateJob() {
    const navigate =
        useNavigate();

    const { id } =
        useParams();

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        resolver:
            zodResolver(
                jobSchema
            ),
    });

    useEffect(() => {
        const fetchJob =
            async () => {
                try {
                    const res =
                        await getJobById(
                            id
                        );

                    const job =
                        res.data.data;

                    reset({
                        title:
                            job.title,

                        description:
                            job.description,

                        skillsRequired:
                            job.skillsRequired.join(
                                ", "
                            ),

                        budget:
                            job.budget,

                        experienceLevel:
                            job.experienceLevel,
                    });
                } catch (error) {
                    toast.error(
                        error.response?.data?.message ||
                        "Failed to load job"
                    );
                }
            };

        fetchJob();
    }, [id, reset]);

    const onSubmit =
        async (data) => {
            try {
                const payload = {
                    ...data,

                    skillsRequired:
                        data.skillsRequired
                            .split(",")
                            .map((skill) =>
                                skill.trim()
                            ),
                };

                await updateJob(
                    id,
                    payload
                );

                toast.success(
                    "Job Updated Successfully"
                );

                navigate(
                    "/jobs"
                );
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to update job"
                );
            }
        };

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Update Job
                </h1>

                <p className="text-gray-400 mt-2">
                    Modify your job posting and keep it up to date.
                </p>

            </div>

            <Card>

                <form
                    onSubmit={handleSubmit(
                        onSubmit
                    )}
                    className="space-y-6"
                >

                    <Input
                        label="Job Title"
                        error={
                            errors.title?.message
                        }
                        {...register(
                            "title"
                        )}
                    />

                    <Input
                        label="Skills Required"
                        placeholder="React, Node.js, MongoDB"
                        error={
                            errors.skillsRequired
                                ?.message
                        }
                        {...register(
                            "skillsRequired"
                        )}
                    />

                    <div className="grid md:grid-cols-2 gap-6">

                        <Input
                            type="number"
                            label="Budget (₹)"
                            error={
                                errors.budget
                                    ?.message
                            }
                            {...register(
                                "budget",
                                {
                                    valueAsNumber:
                                        true,
                                }
                            )}
                        />

                        <div>

                            <label className="block text-sm text-gray-300 mb-2">
                                Experience Level
                            </label>

                            <select
                                className="
                                w-full
                                px-4
                                py-3
                                rounded-xl
                                bg-[#111111]
                                border
                                border-[#262626]
                                text-white
                                outline-none
                                focus:border-blue-500
                            "
                                {...register(
                                    "experienceLevel"
                                )}
                            >
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

                        </div>

                    </div>

                    <TextArea
                        label="Description"
                        rows={8}
                        error={
                            errors.description
                                ?.message
                        }
                        {...register(
                            "description"
                        )}
                    />

                    <div className="flex justify-end">

                        <Button
                            type="submit"
                            disabled={
                                isSubmitting
                            }
                        >
                            {isSubmitting
                                ? "Updating..."
                                : "Update Job"}
                        </Button>

                    </div>

                </form>

            </Card>

        </div>
    );
}

export default UpdateJob;