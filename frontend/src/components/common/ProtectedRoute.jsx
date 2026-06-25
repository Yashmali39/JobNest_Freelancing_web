import {
  Navigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

function ProtectedRoute({
  children,
}) {
  const {
    loading,
    isAuthenticated,
  } = useAuth();

  if (loading)
    return (
      <h1>
        Loading...
      </h1>
    );

  if (
    !isAuthenticated
  ) {
    return (
      <Navigate
        to="/login"
      />
    );
  }

  return children;
}

export default ProtectedRoute;