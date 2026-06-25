import { useAuth } from "../../context/AuthContext";

import ClientJobs from "./ClientJobs";
import FreelancerJobs from "./FreelancerJobs";

function Jobs() {
  const { user } =
    useAuth();

  if (
    user?.activeRole ===
    "client"
  ) {
    return <ClientJobs />;
  }

  return <FreelancerJobs />;
}

export default Jobs;