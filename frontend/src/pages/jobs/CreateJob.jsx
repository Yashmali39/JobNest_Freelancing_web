import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { jobSchema } from "../../validations/job.schema";

import { createJob } from "../../api/job.api";

import { generateJobDescription } from "../../api/ai.api";

import toast from "react-hot-toast";

import Button from "../../components/common/Button";

import Card from "../../components/common/Card";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";



function CreateJob() {
    const navigate =
        useNavigate();

    const {
        register,
        handleSubmit,
        getValues,
        setValue,
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

    const [
        generatingDescription,
        setGeneratingDescription,
    ] = useState(false);


    const handleGenerateDescription =
        async () => {
            try {
                const title =
                    getValues(
                        "title"
                    );

                const skills =
                    getValues(
                        "skillsRequired"
                    );

                const experience =
                    getValues(
                        "experienceLevel"
                    );

                if (
                    !title ||
                    !skills
                ) {
                    toast.error(
                        "Please enter title and skills first"
                    );

                    return;
                }

                setGeneratingDescription(
                    true
                );

                const res =
                    await generateJobDescription(
                        {
                            jobTitle:
                                title,

                            skills:
                                skills
                                    .split(",")
                                    .map(
                                        (
                                            skill
                                        ) =>
                                            skill.trim()
                                    ),

                            experience,
                        }
                    );

                setValue(
                    "description",
                    res.data.data
                        .description
                );
            } catch (
            error
            ) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to generate description"
                );
            } finally {
                setGeneratingDescription(
                    false
                );
            }
        };

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

                await createJob(
                    payload
                );

                toast.success(
                    "Job Created Successfully"
                );

                navigate(
                    "/jobs"
                );
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to create job"
                );
            }
        };

    return (
        <div className="max-w-5xl mx-auto px-6 py-8">

            {/* Header */}

            <div className="mb-8">

                <h1 className="text-3xl md:text-4xl font-bold text-white">
                    Create Job
                </h1>

                <p className="text-gray-400 mt-2">
                    Create a new opportunity and attract freelancers.
                </p>

            </div>

            <Card>

                <form
                    onSubmit={handleSubmit(
                        onSubmit
                    )}
                    className="space-y-6"
                >

                    {/* Job Title */}

                    <Input
                        label="Job Title"
                        placeholder="MERN Stack Developer Needed"
                        error={
                            errors.title?.message
                        }
                        {...register("title")}
                    />

                    {/* Skills */}

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

                    {/* Budget + Experience */}

                    <div className="grid md:grid-cols-2 gap-6">

                        <Input
                            type="number"
                            label="Budget (₹)"
                            placeholder="50000"
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
                                <option value="">
                                    Select Experience
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

                        </div>

                    </div>

                    {/* AI Description */}

                    <div
                        className="
            border
            border-[#262626]
            rounded-xl
            p-5
            bg-[#0D0D0D]
          "
                    >

                        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">

                            <div>

                                <h3 className="text-lg font-semibold text-white">
                                    AI Job Description
                                </h3>

                                <p className="text-gray-400 text-sm">
                                    Generate a professional description using AI.
                                </p>

                            </div>

                            <Button
                                type="button"
                                onClick={
                                    handleGenerateDescription
                                }
                                disabled={
                                    generatingDescription
                                }
                            >
                                {generatingDescription
                                    ? "Generating..."
                                    : "Generate AI Description"}
                            </Button>

                        </div>

                    </div>

                    {/* Description */}

                    <TextArea
                        label="Description"
                        rows={8}
                        placeholder="Describe the project..."
                        error={
                            errors.description
                                ?.message
                        }
                        {...register(
                            "description"
                        )}
                    />

                    {/* Submit */}

                    <div className="flex justify-end">

                        <Button
                            type="submit"
                            disabled={
                                isSubmitting
                            }
                        >
                            {isSubmitting
                                ? "Creating..."
                                : "Create Job"}
                        </Button>

                    </div>

                </form>

            </Card>

        </div>
    );
}

export default CreateJob;