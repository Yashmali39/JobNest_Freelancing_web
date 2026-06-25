import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { freelancerProfileSchema } from "../../validations/freelancer.schema";
import { createFreelancerProfile } from "../../api/freelancer.api";
import { useAuth } from "../../context/AuthContext";

import toast from "react-hot-toast";

function CreateFreelancerProfile() {
    const navigate = useNavigate();

    const { fetchUser } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(
            freelancerProfileSchema
        ),
    });

    const onSubmit = async (
        data
    ) => {
        try {
            const payload = {
                ...data,

                skills: data.skills
                    .split(",")
                    .map((skill) =>
                        skill.trim()
                    ),

                portfolioLinks:
                    data.portfolioLinks
                        ? [
                            data.portfolioLinks,
                        ]
                        : [],
            };

            await createFreelancerProfile(
                payload
            );

            await fetchUser();

            navigate("/dashboard");
        } catch (error) {
            toast.error(
                error.response?.data
                    ?.message ||
                "Something went wrong"
            );
        }
    };

    return (
        <div
            className="
            min-h-screen
            bg-[#0A0A0A]
            flex
            items-center
            justify-center
            px-4
            py-8
        "
        >
            <div
                className="
                w-full
                max-w-3xl
                bg-[#111111]
                border
                border-[#262626]
                rounded-2xl
                p-6
                md:p-8
            "
            >
                {/* Header */}

                <div className="text-center mb-8">

                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        Create Freelancer Profile
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Showcase your skills and start applying to projects.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit(
                        onSubmit
                    )}
                    className="space-y-6"
                >

                    {/* Professional Title */}

                    <div>

                        <label
                            className="
                            block
                            text-sm
                            text-gray-300
                            mb-2
                        "
                        >
                            Professional Title
                        </label>

                        <input
                            {...register(
                                "title"
                            )}
                            placeholder="Full Stack Developer"
                            className="
                            w-full
                            bg-[#0D0D0D]
                            border
                            border-[#262626]
                            rounded-xl
                            px-4
                            py-3
                            text-white
                            outline-none
                            focus:border-blue-500
                        "
                        />

                        <p className="text-red-500 text-sm mt-1">
                            {errors.title?.message}
                        </p>

                    </div>

                    {/* Bio */}

                    <div>

                        <label
                            className="
                            block
                            text-sm
                            text-gray-300
                            mb-2
                        "
                        >
                            Bio
                        </label>

                        <textarea
                            rows="5"
                            {...register(
                                "bio"
                            )}
                            placeholder="Tell clients about your experience..."
                            className="
                            w-full
                            bg-[#0D0D0D]
                            border
                            border-[#262626]
                            rounded-xl
                            px-4
                            py-3
                            text-white
                            outline-none
                            focus:border-blue-500
                        "
                        />

                        <p className="text-red-500 text-sm mt-1">
                            {errors.bio?.message}
                        </p>

                    </div>

                    {/* Skills */}

                    <div>

                        <label
                            className="
                            block
                            text-sm
                            text-gray-300
                            mb-2
                        "
                        >
                            Skills
                        </label>

                        <input
                            placeholder="React, Node.js, MongoDB"
                            {...register(
                                "skills"
                            )}
                            className="
                            w-full
                            bg-[#0D0D0D]
                            border
                            border-[#262626]
                            rounded-xl
                            px-4
                            py-3
                            text-white
                            outline-none
                            focus:border-blue-500
                        "
                        />

                        <p className="text-red-500 text-sm mt-1">
                            {errors.skills?.message}
                        </p>

                    </div>

                    {/* Experience + Hourly Rate */}

                    <div
                        className="
                        grid
                        md:grid-cols-2
                        gap-6
                    "
                    >

                        <div>

                            <label
                                className="
                                block
                                text-sm
                                text-gray-300
                                mb-2
                            "
                            >
                                Experience (Years)
                            </label>

                            <input
                                type="number"
                                {...register(
                                    "experience",
                                    {
                                        valueAsNumber: true,
                                    }
                                )}
                                className="
                                w-full
                                bg-[#0D0D0D]
                                border
                                border-[#262626]
                                rounded-xl
                                px-4
                                py-3
                                text-white
                                outline-none
                                focus:border-blue-500
                            "
                            />

                            <p className="text-red-500 text-sm mt-1">
                                {errors.experience?.message}
                            </p>

                        </div>

                        <div>

                            <label
                                className="
                                block
                                text-sm
                                text-gray-300
                                mb-2
                            "
                            >
                                Hourly Rate (₹)
                            </label>

                            <input
                                type="number"
                                {...register(
                                    "hourlyRate",
                                    {
                                        valueAsNumber: true,
                                    }
                                )}
                                className="
                                w-full
                                bg-[#0D0D0D]
                                border
                                border-[#262626]
                                rounded-xl
                                px-4
                                py-3
                                text-white
                                outline-none
                                focus:border-blue-500
                            "
                            />

                            <p className="text-red-500 text-sm mt-1">
                                {errors.hourlyRate?.message}
                            </p>

                        </div>

                    </div>

                    {/* Portfolio */}

                    <div>

                        <label
                            className="
                            block
                            text-sm
                            text-gray-300
                            mb-2
                        "
                        >
                            Portfolio Link
                        </label>

                        <input
                            placeholder="https://portfolio.com"
                            {...register(
                                "portfolioLinks"
                            )}
                            className="
                            w-full
                            bg-[#0D0D0D]
                            border
                            border-[#262626]
                            rounded-xl
                            px-4
                            py-3
                            text-white
                            outline-none
                            focus:border-blue-500
                        "
                        />

                        <p className="text-red-500 text-sm mt-1">
                            {
                                errors
                                    .portfolioLinks
                                    ?.message
                            }
                        </p>

                    </div>

                    {/* Submit */}

                    <button
                        type="submit"
                        disabled={
                            isSubmitting
                        }
                        className="
                        w-full
                        bg-blue-500
                        hover:bg-blue-600
                        disabled:opacity-50
                        text-white
                        py-3
                        rounded-xl
                        font-medium
                        transition-all
                    "
                    >
                        {isSubmitting
                            ? "Creating Profile..."
                            : "Create Freelancer Profile"}
                    </button>

                </form>
            </div>
        </div>
    );
}

export default CreateFreelancerProfile;