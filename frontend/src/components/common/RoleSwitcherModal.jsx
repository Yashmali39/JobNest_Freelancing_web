import {
  useNavigate,
} from "react-router-dom";

import {
  switchRole,
} from "../../api/user.api";

import {
  useAuth,
} from "../../context/AuthContext";

import Button
  from "../common/Button";

import toast
  from "react-hot-toast";

function RoleSwitcherModal({
  open,
  onClose,
}) {
  const navigate =
    useNavigate();

  const {
    user,
    fetchUser,
  } = useAuth();

  if (!open)
    return null;

  const targetRole =
    user.activeRole ===
    "client"
      ? "freelancer"
      : "client";

  const handleSwitch =
    async () => {
      try {
        const hasRole =
          user.roles.includes(
            targetRole
          );

        if (hasRole) {
          await switchRole(
            targetRole
          );

          await fetchUser();

          toast.success(
            `Switched to ${targetRole}`
          );

          onClose();

          return;
        }

        onClose();

        navigate(
          targetRole ===
            "client"
            ? "/client/create-profile"
            : "/freelancer/create-profile"
        );
      } catch (
        error
      ) {
        toast.error(
          error.response?.data
            ?.message ||
            "Failed to switch role"
        );
      }
    };

  return (
    <div
      className="
        fixed
        inset-0
        bg-black/60
        backdrop-blur-sm
        flex
        items-center
        justify-center
        z-[100]
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-[#111111]
          border
          border-[#262626]
          rounded-2xl
          p-6
        "
      >

        {/* Header */}

        <div className="flex justify-between items-center">

          <h2 className="text-xl font-semibold text-white">
            Switch Role
          </h2>

          <button
            onClick={onClose}
            className="
              text-gray-400
              hover:text-white
              text-xl
            "
          >
            ✕
          </button>

        </div>

        {/* Body */}

        <div className="mt-6">

          <p className="text-gray-400">
            Current Role
          </p>

          <p className="text-white font-medium mt-1">
            {user.activeRole}
          </p>

          <p className="text-gray-400 mt-6">
            Want to switch to:
          </p>

          <p className="text-blue-400 font-semibold mt-1 capitalize">
            {targetRole}
          </p>

        </div>

        {/* Actions */}

        <div className="mt-8">

          <Button
            className="w-full"
            onClick={
              handleSwitch
            }
          >
            Switch to{" "}
            {targetRole}
          </Button>

        </div>

      </div>
    </div>
  );
}

export default RoleSwitcherModal;