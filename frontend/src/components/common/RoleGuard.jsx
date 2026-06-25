import {
  Navigate,
} from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function RoleGuard({
  children,
}) {
  const {
    user,
    loading,
  } = useAuth();

  if (loading) {
    return (
      <h1>
        Loading...
      </h1>
    );
  }

  if (
    user &&
    !user.activeRole
  ) {
    return (
      <Navigate
        to="/choose-profile"
      />
    );
  }

  return children;
}

export default RoleGuard;