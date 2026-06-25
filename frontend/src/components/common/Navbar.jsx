import {
  logoutUser,
} from "../../api/auth.api";

import {
  useNavigate,
} from "react-router-dom";

import {
  useAuth,
} from "../../context/AuthContext";

import NavLinks from "./NavLinks";

import RoleSwitcher from "./RoleSwitcher";
import RoleSwitcherModal from "./RoleSwitcherModal";

import { useState } from "react";
import { Menu, X } from "lucide-react";

function Navbar() {
  const navigate =
    useNavigate();

  const [
    showRoleModal,
    setShowRoleModal,
  ] = useState(false);



  const [mobileMenuOpen, setMobileMenuOpen] =
    useState(false);

  const {
    user,
    fetchUser,
  } = useAuth();

  const handleLogout =
    async () => {
      await logoutUser();

      await fetchUser();

      navigate(
        "/login"
      );
    };

  return (
    <nav
      className="
      sticky
      top-0
      z-50
      bg-[#0A0A0A]
      border-b
      border-[#262626]
    "
    >
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-4">

        {/* Top Bar */}

        <div className="flex items-center justify-between">

          {/* Logo */}

          <div>
            <h1 className="text-2xl font-bold text-white">
              JobNest
            </h1>

            <p className="text-xs text-gray-500">
              Freelancing Platform
            </p>
          </div>

          {/* Desktop Nav */}

          <div className="hidden lg:flex items-center gap-6">

            <NavLinks />



            <button
              onClick={() =>
                setShowRoleModal(true)
              }
              className="
                px-3
                py-1
                rounded-full
                bg-blue-500/10
                text-blue-400
                text-sm
                hover:bg-blue-500/20
                transition
              "
            >
              {user?.activeRole}
            </button>

            <RoleSwitcherModal
              open={showRoleModal}
              onClose={() =>
                setShowRoleModal(false)
              }
            />


            <button
              onClick={handleLogout}
              className="
              px-4
              py-2
              rounded-xl
              bg-red-500
              hover:bg-red-600
              text-white
              transition
            "
            >
              Logout
            </button>

          </div>

          {/* Mobile Toggle */}

          <button
            className="lg:hidden text-white"
            onClick={() =>
              setMobileMenuOpen(
                !mobileMenuOpen
              )
            }
          >
            {mobileMenuOpen ? (
              <X size={24} />
            ) : (
              <Menu size={24} />
            )}
          </button>

        </div>

        {/* Mobile Menu */}

        {mobileMenuOpen && (
          <div
            className="
            lg:hidden
            mt-4
            border-t
            border-[#262626]
            pt-4
            flex
            flex-col
            gap-4
          "
          >

            <NavLinks />

            <div className="flex flex-col gap-3">

              <button
                onClick={() =>
                  setShowRoleModal(true)
                }
                className="
                  px-3
                  py-1
                  rounded-full
                  bg-blue-500/10
                  text-blue-400
                  text-sm
                  hover:bg-blue-500/20
                  transition
                "
              >
                {user?.activeRole}
              </button>

              <RoleSwitcherModal
                open={showRoleModal}
                onClose={() =>
                  setShowRoleModal(false)
                }
              />


              <button
                onClick={handleLogout}
                className="
                px-4
                py-2
                rounded-xl
                bg-red-500
                text-white
              "
              >
                Logout
              </button>

            </div>

          </div>
        )}

      </div>
    </nav>
  );
}

export default Navbar;