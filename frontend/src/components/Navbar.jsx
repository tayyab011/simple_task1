import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { logout } from "../api/api";

const Navbar = () => {
  const navigate = useNavigate();
  const islogin = Cookies.get("token");

  const [data, setdata] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    
      (async () => {
        try {
          const res = await axios.get(
            "http://localhost:5050/api/getMyProfile",
            {
              withCredentials: true,
            }
          );
          setdata(res.data.user);
        } catch (err) {
          console.error("Profile fetch error:", err);
        }
      })();
    
  }, []);

  const Logout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <nav className="bg-white border-gray-200 dark:bg-gray-900">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <a className="flex items-center space-x-3 rtl:space-x-reverse">
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              Tay
            </span>
          </a>

          <div className="relative md:hidden">
            <img
              className="w-12 h-12 rounded-full cursor-pointer"
              src={data.profilepic}
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            <div
              className={`absolute right-0 mt-2 z-10 ${
                dropdownOpen ? "block" : "hidden"
              } w-56 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
            >
              <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                <div>{data.fullname}</div>
                <div className="font-medium truncate">{data.email}</div>
              </div>
              <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                <li>
                  <Link
                    to="/"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Profile
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <button
                  onClick={Logout}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div
            className={`${
              menuOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-default"
          >
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border gap-y-3.5 border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {!islogin ? (
                <>
                  <li>
                    <Link
                      to="/signup"
                      className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    >
                      Signup
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/login"
                      className="block py-2 px-3 text-white bg-blue-700 rounded-sm md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                    >
                      Login
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <div className="relative">
                    <img
                      className="w-12 h-12 rounded-full cursor-pointer"
                      src={data.profilepic}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                    />
                    <div
                      className={`absolute right-0 mt-2 z-10 ${
                        dropdownOpen ? "block" : "hidden"
                      } w-56 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
                    >
                      <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                        <div>{data.fullname}</div>
                        <div className="font-medium truncate">{data.email}</div>
                      </div>
                      <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                        <li>
                          <Link
                            to="/"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Home
                          </Link>
                        </li>
                        <li>
                          <Link
                            to="/profile"
                            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                          >
                            Profile
                          </Link>
                        </li>
                      </ul>
                      <div className="py-2">
                        <button
                          onClick={Logout}
                          className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
