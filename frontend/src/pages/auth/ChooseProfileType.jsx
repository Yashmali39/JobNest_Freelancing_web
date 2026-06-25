import {
  useNavigate,
} from "react-router-dom";

function ChooseProfileType() {
  const navigate =
    useNavigate();

  return (
    <div
      className="
        min-h-screen
        bg-[#0A0A0A]
        flex
        items-center
        justify-center
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-4xl
          text-center
        "
      >
        {/* Header */}

        <h1 className="text-4xl md:text-5xl font-bold text-white">
          Welcome to JobNest
        </h1>

        <p className="text-gray-400 mt-4 text-lg">
          Choose how you want to use the platform.
        </p>

        {/* Options */}

        <div
          className="
            mt-12
            grid
            md:grid-cols-2
            gap-6
          "
        >
          {/* Freelancer */}

          <div
            onClick={() =>
              navigate(
                "/freelancer/create-profile"
              )
            }
            className="
              cursor-pointer
              bg-[#111111]
              border
              border-[#262626]
              rounded-2xl
              p-8
              hover:border-blue-500
              hover:scale-[1.02]
              transition-all
            "
          >
            <div className="text-5xl mb-4">
              💼
            </div>

            <h2 className="text-2xl font-semibold text-white">
              Freelancer
            </h2>

            <p className="text-gray-400 mt-3">
              Find projects, apply to jobs,
              showcase your skills and
              grow your freelancing career.
            </p>

            <button
              className="
                mt-6
                w-full
                py-3
                rounded-xl
                bg-blue-500
                hover:bg-blue-600
                text-white
                font-medium
              "
            >
              Continue as Freelancer
            </button>
          </div>

          {/* Client */}

          <div
            onClick={() =>
              navigate(
                "/client/create-profile"
              )
            }
            className="
              cursor-pointer
              bg-[#111111]
              border
              border-[#262626]
              rounded-2xl
              p-8
              hover:border-green-500
              hover:scale-[1.02]
              transition-all
            "
          >
            <div className="text-5xl mb-4">
              🚀
            </div>

            <h2 className="text-2xl font-semibold text-white">
              Client
            </h2>

            <p className="text-gray-400 mt-3">
              Post jobs, hire talented
              freelancers and manage
              projects efficiently.
            </p>

            <button
              className="
                mt-6
                w-full
                py-3
                rounded-xl
                bg-green-500
                hover:bg-green-600
                text-white
                font-medium
              "
            >
              Continue as Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChooseProfileType;