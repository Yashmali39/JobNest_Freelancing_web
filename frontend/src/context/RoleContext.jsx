import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { useAuth } from "./AuthContext";

const RoleContext =
  createContext();

export const RoleProvider =
  ({ children }) => {
    const { user } =
      useAuth();

    const [
      role,
      setRole,
    ] = useState("");

    useEffect(() => {
      if (user) {
        setRole(
          user.activeRole
        );
      }
    }, [user]);

    return (
      <RoleContext.Provider
        value={{
          role,
          setRole,
        }}
      >
        {children}
      </RoleContext.Provider>
    );
  };

export const useRole =
  () =>
    useContext(
      RoleContext
    );