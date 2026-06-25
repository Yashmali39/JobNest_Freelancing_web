import {
  Link,
} from "react-router-dom";

function CTASection() {
  return (
    <section className="py-24 px-6">

      <div
        className="
          max-w-5xl
          mx-auto
          text-center
          bg-[#111111]
          border
          border-[#262626]
          rounded-3xl
          p-12
        "
      >

        <h2 className="text-4xl font-bold">
          Ready To Get Started?
        </h2>

        <p className="mt-4 text-gray-400">
          Join JobNest and connect with opportunities powered by AI.
        </p>

        <Link to="/register">

          <button
            className="
              mt-8
              px-8
              py-4
              bg-blue-500
              hover:bg-blue-600
              rounded-xl
              font-medium
            "
          >
            Create Account
          </button>

        </Link>

      </div>

    </section>
  );
}

export default CTASection;