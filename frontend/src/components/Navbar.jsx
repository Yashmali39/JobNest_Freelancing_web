import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from './AuthContext';
import { FaUserCircle } from 'react-icons/fa';

const Navbar = () => {
  const { isLoggedIn, user } = useAuth();
  console.log(isLoggedIn);
  const navLinkStyles = ({ isActive }) =>
    isActive
      ? "text-blue-600 font-bold"
      : "text-gray-600 hover:text-blue-600";

  return (
    <header className="bg-slate-800 shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-600">JobNest</h1>
        <nav className="hidden md:flex space-x-6">
          <NavLink to="/" className={navLinkStyles} end>
            Home
          </NavLink>
          <NavLink to="/findwork" className={navLinkStyles}>
            Find Work
          </NavLink>
          <NavLink to="/findfreelancers" className={navLinkStyles}>
            Find Freelancer
          </NavLink>
        </nav>

        <div className='flex gap-3 items-center'>
          <NavLink
            to="/postproject"
            className="hidden md:inline-block bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
          >
            Post a project
          </NavLink>
          {isLoggedIn && user ? (
            <>
              {(user.role === "freelancer" &&
                <NavLink to={`/freelancerprofile/${user.freelancerId}`} className={navLinkStyles}>
                  <FaUserCircle className='size-9' />

                </NavLink>

              )}
              {(user.role === "client" &&
                <NavLink to={`/clientprofile/${user.clientId}`} className={navLinkStyles}>
                  <FaUserCircle className='size-9' />

                </NavLink>

              )}
              <NavLink to="/logout" className="text-gray-600 hover:text-blue-600">Logout</NavLink>
            </>
          ) : (
            <>
              {/* <NavLink to="/login">Login</NavLink>
          <NavLink to="/signin">Sign Up</NavLink> */}
            </>
          )}
        </div>


        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            className="text-gray-300 focus:outline-none"
            onClick={() => {
              const menu = document.getElementById('mobile-menu');
              menu.classList.toggle('hidden');
            }}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      <div id="mobile-menu" className="hidden md:hidden bg-slate-800 px-6 py-4 space-y-4">
        <NavLink to="/" className={navLinkStyles} end>
          Home
        </NavLink>
        <NavLink to="/findwork" className={navLinkStyles}>
          Find Work
        </NavLink>
        <NavLink to="/findfreelancers" className={navLinkStyles}>
          Find Freelancer
        </NavLink>
        <NavLink
          to="/postproject"
          className="block bg-blue-600 text-white px-4 py-2 rounded-xl shadow hover:bg-blue-700"
        >
          Post a project
        </NavLink>
      </div>
    </header>
  );
};

export default Navbar;
