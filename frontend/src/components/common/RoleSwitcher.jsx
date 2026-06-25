import {
  switchRole,
} from "../../api/user.api";

import {
  useAuth,
} from "../../context/AuthContext";

function RoleSwitcher() {
  const {
    user,
    fetchUser,
  } = useAuth();

  if (
    !user?.roles ||
    user.roles.length < 2
  ) {
    return null;
  }

  const handleChange =
    async (e) => {
      const role =
        e.target.value;

      await switchRole(
        role
      );

      await fetchUser();
    };

  return (
    <select
      value={
        user.activeRole
      }
      onChange={
        handleChange
      }
      className="
  w-full
  lg:w-auto

  min-w-[140px]

  bg-[#111111]
  border
  border-[#262626]

  text-white
  text-sm

  rounded-xl

  px-4
  py-2.5

  outline-none

  focus:border-blue-500
  focus:ring-1
  focus:ring-blue-500/30

  transition-all
  cursor-pointer
"
    >
      {user.roles.map(
        (role) => (
          <option
            key={role}
            value={role}
            className="
            bg-[#111111]
            text-white
          "
          >
            {role}
          </option>
        )
      )}
    </select>
  );
}

export default RoleSwitcher;