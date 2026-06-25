import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  getCurrentUser,
} from "../api/auth.api";

const AuthContext =
  createContext();

export const AuthProvider =
  ({ children }) => {
    const [
      user,
      setUser,
    ] = useState(null);

    const [
      loading,
      setLoading,
    ] = useState(true);

    const [
      isAuthenticated,
      setIsAuthenticated,
    ] = useState(false);

    const fetchUser =
      async () => {
        try {
          const res =
            await getCurrentUser();

          setUser(
            res.data.data
          );

          setIsAuthenticated(
            true
          );
        } catch {
          setUser(null);

          setIsAuthenticated(
            false
          );
        } finally {
          setLoading(
            false
          );
        }
      };

    useEffect(() => {
      fetchUser();
    }, []);

    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          loading,
          isAuthenticated,
          setIsAuthenticated,
          fetchUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  };

export const useAuth =
  () =>
    useContext(
      AuthContext
    );