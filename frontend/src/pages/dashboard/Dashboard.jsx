import { useAuth } from "../../context/AuthContext";

import FreelancerDashboard from "./FreelancerDashboard";
import ClientDashboard from "./ClientDashboard";

function Dashboard() {
  const { user } =
    useAuth();

  if (
    user?.activeRole ===
    "freelancer"
  ) {
    return (
      <FreelancerDashboard />
    );
  }

  if (
    user?.activeRole ===
    "client"
  ) {
    return (
      <ClientDashboard />
    );
  }

  return null;
}

export default Dashboard;