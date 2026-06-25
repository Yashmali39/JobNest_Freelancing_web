import {
  useEffect,
  useState,
} from "react";

import {
  Link,
} from "react-router-dom";

import {
  getFreelancerProfile,
} from "../../api/freelancer.api";

import ResumeSection from "../../components/profile/ResumeSection";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

function FreelancerProfileView() {
    const [
        profile,
        setProfile,
    ] = useState(null);

    useEffect(() => {
        const fetchProfile =
            async () => {
                const res =
                    await getFreelancerProfile();

                setProfile(
                    res.data.data
                );
            };

        fetchProfile();
    }, []);

   if (!profile)
  return <Loader />;

return (
  <div className="max-w-6xl mx-auto px-6 py-8">

    {/* Header */}

    <div className="flex justify-between items-start mb-8">

      <div>
        <h1 className="text-4xl font-bold text-white">
          {profile.userId.name}
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your professional profile.
        </p>
      </div>

      <Link
        to="/profile/edit-freelancer"
      >
        <Button>
          Edit Profile
        </Button>
      </Link>

    </div>

    {/* Overview */}

    <Card className="mb-6">
      

      <h2 className="text-3xl font-bold text-white">
        {profile.title}
      </h2>

      <p className="text-gray-300 mt-4 leading-relaxed">
        {profile.bio}
      </p>

    </Card>

    {/* Stats */}

    <div className="grid md:grid-cols-2 gap-6 mb-6">

      <Card>

        <p className="text-gray-400 text-sm">
          Experience
        </p>

        <h3 className="text-2xl font-semibold text-white mt-2">
          {profile.experience} Years
        </h3>

      </Card>

      <Card>

        <p className="text-gray-400 text-sm">
          Hourly Rate
        </p>

        <h3 className="text-2xl font-semibold text-white mt-2">
          ₹{profile.hourlyRate}/hr
        </h3>

      </Card>

    </div>

    {/* Skills */}

    <Card className="mb-6">

      <h2 className="text-xl font-semibold text-white mb-4">
        Skills
      </h2>

      <div className="flex flex-wrap gap-3">

        {profile.skills?.map(
          (skill) => (
            <span
              key={skill}
              className="
                px-3
                py-1
                rounded-full
                bg-blue-500/10
                text-blue-400
                text-sm
              "
            >
              {skill}
            </span>
          )
        )}

      </div>

    </Card>

    {/* Resume */}

    

    <ResumeSection/>

  </div>
);
}

export default FreelancerProfileView;