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
    clientProfileSchema,
} from "../../validations/client.schema";

import {
    getClientProfile,
    updateClientProfile,
} from "../../api/client.api";

import Button from "../../components/common/Button";
import toast from "react-hot-toast";

import Input from "../../components/common/Input";
import TextArea from "../../components/common/TextArea";
import Card from "../../components/common/Card";

function EditClientProfile() {
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
                clientProfileSchema
            ),
    });

    useEffect(() => {
        const fetchProfile =
            async () => {
                try {
                    const res =
                        await getClientProfile();

                    const profile =
                        res.data.data;

                    reset({
                        companyName:
                            profile.companyName,

                        companyDescription:
                            profile.companyDescription,

                        industry:
                            profile.industry,

                        website:
                            profile.website,

                        companySize:
                            profile.companySize,
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
                await updateClientProfile(
                    data
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
                    Edit Client Profile
                </h1>

                <p className="text-gray-400 mt-2">
                    Update your company information.
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
                        label="Company Name"
                        error={
                            errors.companyName
                                ?.message
                        }
                        {...register(
                            "companyName"
                        )}
                    />

                    <TextArea
                        label="Company Description"
                        rows={6}
                        error={
                            errors.companyDescription
                                ?.message
                        }
                        {...register(
                            "companyDescription"
                        )}
                    />

                    <Input
                        label="Industry"
                        placeholder="Software Development"
                        error={
                            errors.industry
                                ?.message
                        }
                        {...register(
                            "industry"
                        )}
                    />

                    <Input
                        label="Website"
                        placeholder="https://company.com"
                        error={
                            errors.website
                                ?.message
                        }
                        {...register(
                            "website"
                        )}
                    />

                    {/* Company Size */}

                    <div>

                        <label className="block text-sm text-gray-300 mb-2">
                            Company Size
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
              transition
            "
                            {...register(
                                "companySize"
                            )}
                        >
                            <option value="">
                                Select Size
                            </option>

                            <option value="1-10">
                                1 - 10 Employees
                            </option>

                            <option value="11-50">
                                11 - 50 Employees
                            </option>

                            <option value="51-200">
                                51 - 200 Employees
                            </option>

                            <option value="201-500">
                                201 - 500 Employees
                            </option>

                            <option value="500+">
                                500+ Employees
                            </option>
                        </select>

                        {errors.companySize && (
                            <p className="text-red-400 text-sm mt-1">
                                {
                                    errors
                                        .companySize
                                        ?.message
                                }
                            </p>
                        )}

                    </div>

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

export default EditClientProfile;