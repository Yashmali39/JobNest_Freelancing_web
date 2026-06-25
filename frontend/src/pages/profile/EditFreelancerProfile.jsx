import {
    useEffect,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    freelancerProfileSchema,
} from "../../validations/freelancer.schema";

import {
    getFreelancerProfile,
    updateFreelancerProfile,
} from "../../api/freelancer.api";

import Button from "../../components/common/Button";
import toast from "react-hot-toast";
import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import Card from "../../components/common/Card";
import Loader from "../../components/common/Loader";



function EditFreelancerProfile() {
    const navigate =
        useNavigate();

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
                freelancerProfileSchema
            ),
    });

    useEffect(() => {
        const fetchProfile =
            async () => {
                try {
                    const res =
                        await getFreelancerProfile();

                    const profile =
                        res.data.data;

                    reset({
                        title:
                            profile.title,

                        bio:
                            profile.bio,

                        skills:
                            profile.skills.join(
                                ", "
                            ),

                        experience:
                            profile.experience,

                        hourlyRate:
                            profile.hourlyRate,

                        portfolioLinks:
                            profile
                                .portfolioLinks[0] ||
                            "",
                    });
                } catch (error) {
                    toast.error(
                        error.response?.data?.message ||
                        "Failed to load profile"
                    );
                }
            };

        fetchProfile();
    }, [reset]);

    const onSubmit =
        async (data) => {
            try {
                const payload = {
                    ...data,

                    skills:
                        data.skills
                            .split(",")
                            .map(
                                (
                                    skill
                                ) =>
                                    skill.trim()
                            ),

                    portfolioLinks:
                        data.portfolioLinks
                            ? [
                                data.portfolioLinks,
                            ]
                            : [],
                };

                await updateFreelancerProfile(
                    payload
                );

                toast.success(
                    "Profile Update Successfully"
                );


                navigate(
                    "/profile"
                );
            } catch (error) {
                toast.error(
                    error.response?.data?.message ||
                    "Failed to update profile"
                );
            }
        };

    return (
    <div className="max-w-4xl mx-auto px-6 py-8">

        {/* Header */}

        <div className="mb-8">

            <h1 className="text-4xl font-bold text-white">
                Edit Freelancer Profile
            </h1>

            <p className="text-gray-400 mt-2">
                Update your professional information.
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
                    label="Professional Title"
                    error={
                        errors.title
                            ?.message
                    }
                    {...register(
                        "title"
                    )}
                />

                <TextArea
                    label="Bio"
                    rows={6}
                    error={
                        errors.bio
                            ?.message
                    }
                    {...register(
                        "bio"
                    )}
                />

                <Input
                    label="Skills"
                    placeholder="React, Node.js, MongoDB"
                    error={
                        errors.skills
                            ?.message
                    }
                    {...register(
                        "skills"
                    )}
                />

                <div className="grid md:grid-cols-2 gap-6">

                    <Input
                        type="number"
                        label="Experience (Years)"
                        error={
                            errors
                                .experience
                                ?.message
                        }
                        {...register(
                            "experience",
                            {
                                valueAsNumber:
                                    true,
                            }
                        )}
                    />

                    <Input
                        type="number"
                        label="Hourly Rate (₹)"
                        error={
                            errors
                                .hourlyRate
                                ?.message
                        }
                        {...register(
                            "hourlyRate",
                            {
                                valueAsNumber:
                                    true,
                            }
                        )}
                    />

                </div>

                <Input
                    label="Portfolio Link"
                    placeholder="https://yourportfolio.com"
                    error={
                        errors
                            .portfolioLinks
                            ?.message
                    }
                    {...register(
                        "portfolioLinks"
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
                            : "Update Profile"}
                    </Button>

                </div>

            </form>

        </Card>

    </div>
);
}

export default EditFreelancerProfile;