import {
    useEffect,
    useState,
} from "react";

import {
    getClientProfile,
} from "../../api/client.api";

import { Link } from "react-router-dom";

import Card from "../../components/common/Card";
import Button from "../../components/common/Button";
import Loader from "../../components/common/Loader";

function ClientProfileView() {
    const [
        profile,
        setProfile,
    ] = useState(null);

    useEffect(() => {
        const fetchProfile =
            async () => {
                const res =
                    await getClientProfile();

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
          Client Profile
        </h1>

        <p className="text-gray-400 mt-2">
          Manage your company profile and hiring presence.
        </p>
      </div>

      <Link
        to="/profile/edit-client"
      >
        <Button>
          Edit Profile
        </Button>
      </Link>

    </div>

    {/* Company Overview */}

    <Card className="mb-6">

      <h2 className="text-3xl font-bold text-white">
        {profile.companyName}
      </h2>

      <p className="text-gray-300 mt-4 leading-relaxed">
        {profile.companyDescription}
      </p>

    </Card>

    {/* Company Information */}

    <div className="grid md:grid-cols-3 gap-6 mb-6">

      <Card>

        <p className="text-gray-400 text-sm">
          Industry
        </p>

        <h3 className="text-xl font-semibold text-white mt-2">
          {profile.industry}
        </h3>

      </Card>

      <Card>

        <p className="text-gray-400 text-sm">
          Company Size
        </p>

        <h3 className="text-xl font-semibold text-white mt-2">
          {profile.companySize}
        </h3>

      </Card>

      <Card>

        <p className="text-gray-400 text-sm">
          Website
        </p>

        {profile.website ? (
          <a
            href={profile.website}
            target="_blank"
            rel="noreferrer"
            className="
              text-blue-400
              hover:text-blue-300
              break-all
              mt-2
              block
            "
          >
            Visit Website
          </a>
        ) : (
          <p className="text-gray-500 mt-2">
            Not Provided
          </p>
        )}

      </Card>

    </div>

    {/* Company Details */}

    <Card>

      <h2 className="text-xl font-semibold text-white mb-4">
        Company Details
      </h2>

      <div className="space-y-4">

        <div>
          <p className="text-gray-400 text-sm">
            Company Name
          </p>

          <p className="text-white">
            {profile.companyName}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">
            Industry
          </p>

          <p className="text-white">
            {profile.industry}
          </p>
        </div>

        <div>
          <p className="text-gray-400 text-sm">
            Website
          </p>

          <p className="text-white break-all">
            {profile.website ||
              "Not Provided"}
          </p>
        </div>

      </div>

    </Card>

  </div>
);
}

export default ClientProfileView;