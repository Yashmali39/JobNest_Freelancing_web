import {
  Link,
} from "react-router-dom";

function HeroSection() {
  return (
    <section
      className="
        min-h-screen
        flex
        items-center
        justify-center
        px-6
      "
    >
      <div
        className="
          max-w-5xl
          mx-auto
          text-center
        "
      >

        <span
          className="
            px-4
            py-2
            rounded-full
            bg-blue-500/10
            text-blue-400
            text-sm
          "
        >
          AI Powered Freelancing Platform
        </span>

        <h1
          className="
            mt-8
            text-5xl
            md:text-7xl
            font-bold
            leading-tight
          "
        >
          Find Freelance Jobs
          <br />
          Smarter With AI
        </h1>

        <p
          className="
            mt-6
            text-gray-400
            text-lg
            md:text-xl
            max-w-3xl
            mx-auto
          "
        >
          Discover opportunities,
          analyze job matches,
          generate proposals,
          and hire top talent
          using AI.
        </p>

        <div
          className="
            mt-10
            flex
            flex-col
            sm:flex-row
            gap-4
            justify-center
          "
        >

          <Link
            to="/register"
          >
            <button
              className="
                px-8
                py-4
                bg-blue-500
                hover:bg-blue-600
                rounded-xl
                font-medium
              "
            >
              Get Started
            </button>
          </Link>

          <Link
            to="/login"
          >
            <button
              className="
                px-8
                py-4
                border
                border-[#262626]
                rounded-xl
              "
            >
              Login
            </button>
          </Link>

        </div>

      </div>
    </section>
  );
}

export default HeroSection;