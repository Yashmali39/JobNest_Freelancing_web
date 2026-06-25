import { useForm } from "react-hook-form";

import { registerUser } from "../../api/auth.api";

import toast from "react-hot-toast";
import Button from "../../components/common/Button";

import {
    useNavigate,
} from "react-router-dom";


function Register() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: {
            isSubmitting,
        },
    } = useForm();

    const onSubmit = async (
        data
    ) => {
        try {
            await registerUser(data);

            toast.success(
                "Registration Successful"
            );

            reset();

            navigate("/login");
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                "Something went wrong"
            );
        }

    };




    return (
        <div
            className="
            min-h-screen
            flex
            items-center
            justify-center
            bg-[#0A0A0A]
            px-4
        "
        >

            <div
                className="
                w-full
                max-w-md
                bg-[#111111]
                border
                border-[#262626]
                rounded-2xl
                p-8
                shadow-xl
            "
            >

                {/* Header */}

                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-white">
                        Create Account
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Join JobNest and start freelancing.
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit(
                        onSubmit
                    )}
                    className="space-y-5"
                >

                    {/* Name */}

                    <div>

                        <label
                            className="
                            block
                            text-sm
                            text-gray-300
                            mb-2
                        "
                        >
                            Full Name
                        </label>

                        <input
                            placeholder="Enter your name"
                            {...register("name")}
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

                    </div>

                    {/* Email */}

                    <div>

                        <label
                            className="
                            block
                            text-sm
                            text-gray-300
                            mb-2
                        "
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            {...register("email")}
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

                    </div>

                    {/* Password */}

                    <div>

                        <label
                            className="
                            block
                            text-sm
                            text-gray-300
                            mb-2
                        "
                        >
                            Password
                        </label>

                        <input
                            type="password"
                            placeholder="Create a password"
                            {...register("password")}
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
                            ? "Registering..."
                            : "Create Account"}
                    </Button>

                </form>

            </div>

        </div>
    );
}

export default Register;