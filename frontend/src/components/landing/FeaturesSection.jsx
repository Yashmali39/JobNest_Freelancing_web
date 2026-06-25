function FeaturesSection() {
  const features = [
    {
      title: "Job Marketplace",
      icon: "💼",
      description:
        "Browse opportunities and connect with clients worldwide.",
    },

    {
      title: "AI Assistance",
      icon: "🤖",
      description:
        "Generate proposals and analyze job matches using AI.",
    },

    {
      title: "Hire Faster",
      icon: "🚀",
      description:
        "Clients can post jobs and find the right freelancer quickly.",
    },
  ];

  return (
    <section className="py-24 px-6">
      <div className="max-w-7xl mx-auto">

        <h2 className="text-4xl font-bold text-center mb-14">
          Why Choose JobNest?
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {features.map(
            (feature) => (
              <div
                key={feature.title}
                className="
                  bg-[#111111]
                  border
                  border-[#262626]
                  rounded-2xl
                  p-8
                  hover:border-blue-500
                  transition-all
                "
              >
                <div className="text-5xl mb-4">
                  {feature.icon}
                </div>

                <h3 className="text-2xl font-semibold">
                  {feature.title}
                </h3>

                <p className="mt-4 text-gray-400">
                  {feature.description}
                </p>
              </div>
            )
          )}

        </div>

      </div>
    </section>
  );
}

export default FeaturesSection;