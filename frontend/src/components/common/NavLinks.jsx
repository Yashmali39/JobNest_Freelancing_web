import {
  NavLink,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

function NavLinks() {
  const { user } =
    useAuth();

  const role =
    user?.activeRole;

  const navStyle =
    ({ isActive }) =>
      `
        block
        px-3
        py-2
        rounded-lg
        text-sm
        font-medium
        transition-all
        duration-200
        ${
          isActive
            ? `
              bg-blue-500/10
              text-blue-400
            `
            : `
              text-gray-400
              hover:text-white
              hover:bg-[#151515]
            `
        }
      `;

  return (
    <div
      className="
        flex
        flex-col
        lg:flex-row
        gap-2
        lg:gap-4
      "
    >
      <NavLink
        to="/dashboard"
        className={
          navStyle
        }
      >
        Dashboard
      </NavLink>

      <NavLink
        to="/jobs"
        className={
          navStyle
        }
      >
        Jobs
      </NavLink>

      {role ===
        "freelancer" && (
        <>
          <NavLink
            to="/applications"
            className={
              navStyle
            }
          >
            Applications
          </NavLink>

          <NavLink
            to="/profile"
            className={
              navStyle
            }
          >
            Profile
          </NavLink>
        </>
      )}

      {role ===
        "client" && (
        <>
          <NavLink
            to="/freelancers"
            className={
              navStyle
            }
          >
            Freelancers
          </NavLink>

          <NavLink
            to="/profile"
            className={
              navStyle
            }
          >
            Profile
          </NavLink>
        </>
      )}
    </div>
  );
}

export default NavLinks;