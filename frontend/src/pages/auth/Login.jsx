import { useForm } from "react-hook-form";

import { loginUser } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";

import toast from "react-hot-toast";
import Button from "../../components/common/Button";
import {
    useNavigate,
} from "react-router-dom";


function Login() {

    const { fetchUser } =
        useAuth();

    const navigate =
        useNavigate();

    const {
        register,
        handleSubmit,
        formState: {
            isSubmitting,
        },
    } = useForm();

    const onSubmit = async (
        data
    ) => {
        try {
            await loginUser(data);

            await fetchUser();

            toast.success(
                "User Login Successfully"
            );
            navigate("/dashboard");
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
                        Welcome Back
                    </h1>

                    <p className="text-gray-400 mt-2">
                        Login to continue using JobNest
                    </p>

                </div>

                <form
                    onSubmit={handleSubmit(
                        onSubmit
                    )}
                    className="space-y-5"
                >

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
                            placeholder="Enter your password"
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
                            ? "Logging In..."
                            : "Login"}
                    </Button>

                </form>

            </div>

        </div>
    );
}

export default Login;