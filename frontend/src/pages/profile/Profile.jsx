import { useAuth } from "../../context/AuthContext";

import FreelancerProfileView from "./FreelancerProfileView";

import ClientProfileView from "./ClientProfileView";

function Profile() {
  const { user } =
    useAuth();

  if (
    user?.activeRole ===
    "freelancer"
  ) {
    return (
      <FreelancerProfileView />
    );
  }

  if (
    user?.activeRole ===
    "client"
  ) {
    return (
      <ClientProfileView />
    );
  }

  return (
    <h1>
      Profile Not Found
    </h1>
  );
}

export default Profile;