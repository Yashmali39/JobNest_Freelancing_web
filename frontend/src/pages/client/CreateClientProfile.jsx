import { useNavigate } from "react-router-dom";

import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";

import { clientProfileSchema } from "../../validations/client.schema";

import { createClientProfile } from "../../api/client.api";

import { useAuth } from "../../context/AuthContext";

import toast from "react-hot-toast";
import Button from "../../components/common/Button";

function CreateClientProfile() {
    const navigate =
        useNavigate();

    const { fetchUser } =
        useAuth();

    const {
        register,
        handleSubmit,
        formState: {
            errors,
            isSubmitting,
        },
    } = useForm({
        resolver: zodResolver(
            clientProfileSchema
        ),
    });

    const onSubmit = async (
        data
    ) => {
        try {
            await createClientProfile(
                data
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

                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold text-white">
                        Create Client Profile
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Tell freelancers about your company and hiring needs.
                    </p>
                </div>

                <form
                    onSubmit={handleSubmit(
                        onSubmit
                    )}
                    className="space-y-6"
                >
                    {/* Company Name */}

                    <div>
                        <label
                            className="
              block
              text-sm
              text-gray-300
              mb-2
            "
                        >
                            Company Name
                        </label>

                        <input
                            {...register(
                                "companyName"
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
                            placeholder="Mali Technologies"
                        />

                        <p className="text-red-500 text-sm mt-1">
                            {
                                errors.companyName
                                    ?.message
                            }
                        </p>
                    </div>

                    {/* Description */}

                    <div>
                        <label
                            className="
              block
              text-sm
              text-gray-300
              mb-2
            "
                        >
                            Company Description
                        </label>

                        <textarea
                            rows="5"
                            {...register(
                                "companyDescription"
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
                            placeholder="Describe your company..."
                        />

                        <p className="text-red-500 text-sm mt-1">
                            {
                                errors
                                    .companyDescription
                                    ?.message
                            }
                        </p>
                    </div>

                    {/* Industry + Size */}

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
                                Industry
                            </label>

                            <input
                                {...register(
                                    "industry"
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
                                placeholder="Software Development"
                            />

                            <p className="text-red-500 text-sm mt-1">
                                {
                                    errors.industry
                                        ?.message
                                }
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
                                Company Size
                            </label>

                            <select
                                {...register(
                                    "companySize"
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
                            >
                                <option value="">
                                    Select Size
                                </option>

                                <option value="1-10">
                                    1-10 Employees
                                </option>

                                <option value="11-50">
                                    11-50 Employees
                                </option>

                                <option value="51-200">
                                    51-200 Employees
                                </option>

                                <option value="201-500">
                                    201-500 Employees
                                </option>

                                <option value="500+">
                                    500+ Employees
                                </option>
                            </select>

                            <p className="text-red-500 text-sm mt-1">
                                {
                                    errors.companySize
                                        ?.message
                                }
                            </p>
                        </div>
                    </div>

                    {/* Website */}

                    <div>
                        <label
                            className="
              block
              text-sm
              text-gray-300
              mb-2
            "
                        >
                            Website
                        </label>

                        <input
                            {...register(
                                "website"
                            )}
                            placeholder="https://company.com"
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
                                errors.website
                                    ?.message
                            }
                        </p>
                    </div>

                    {/* Submit */}

                    <Button
                        type="submit"
                        disabled={
                            isSubmitting
                        }
                        className="w-full"
                    >
                        {isSubmitting
                            ? "Creating Profile..."
                            : "Create Client Profile"}
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default CreateClientProfile;