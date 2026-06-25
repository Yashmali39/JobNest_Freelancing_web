function AISection() {
  return (
    <section
      className="
        py-24
        px-6
        bg-[#0D0D0D]
      "
    >
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-14">
          AI Powered Features
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          <div className="bg-[#111111] border border-[#262626] rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-blue-400">
              AI Job Description
            </h3>

            <p className="mt-4 text-gray-400">
              Generate professional job descriptions instantly.
            </p>
          </div>

          <div className="bg-[#111111] border border-[#262626] rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-green-400">
              AI Job Match
            </h3>

            <p className="mt-4 text-gray-400">
              Compare resumes with job requirements and get a match score.
            </p>
          </div>

          <div className="bg-[#111111] border border-[#262626] rounded-2xl p-8">
            <h3 className="text-xl font-semibold text-purple-400">
              AI Proposal Generator
            </h3>

            <p className="mt-4 text-gray-400">
              Generate customized proposals in seconds.
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}

export default AISection;