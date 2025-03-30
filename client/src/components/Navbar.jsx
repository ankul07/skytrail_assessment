import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = localStorage.getItem("accessToken");
      const user = localStorage.getItem("user");

      if (accessToken && user) {
        setIsLoggedIn(true);
        try {
          const userData = JSON.parse(user);
          setUserName(userData.name || userData.username || "User");
        } catch (e) {
          setUserName(user);
        }
      } else {
        setIsLoggedIn(false);
        setUserName("");
      }
    };

    checkLoginStatus();

    window.addEventListener("storage", checkLoginStatus);
    window.addEventListener("authStateChanged", checkLoginStatus);

    return () => {
      window.removeEventListener("storage", checkLoginStatus);
      window.removeEventListener("authStateChanged", checkLoginStatus);
    };
  }, [location]);

  // Handle logout krne ke liye
  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");

    window.dispatchEvent(new Event("authStateChanged"));
    navigate("/login");
    setIsMenuOpen(false);
  };

  const isActive = (path) => {
    return location.pathname === path ? "text-blue-500 font-semibold" : "";
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <Link
            to="/"
            className="text-2xl font-bold text-blue-600 flex items-center"
          >
            <span className="mr-2">🌍</span>
            SkyTrails
          </Link>

          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 focus:outline-none"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? (
                // X icon for close
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className={`hover:text-blue-500 ${isActive("/")}`}>
              Home
            </Link>
            <Link
              to="/countryblogs"
              className={`hover:text-blue-500 ${isActive("/countryblogs")}`}
            >
              Countries
            </Link>

            <div className="flex space-x-4">
              {isLoggedIn ? (
                <>
                  <div className="px-4 py-2 text-gray-700 flex items-center">
                    <span className="mr-2">👤</span>
                    {userName}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="px-4 py-2 border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                  >
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu ke liye */}
        <div
          className={`md:hidden ${
            isMenuOpen ? "block" : "hidden"
          } pt-4 pb-2 space-y-4`}
        >
          <div className="flex flex-col space-y-3">
            <Link
              to="/"
              className={`py-2 px-1 hover:bg-gray-100 rounded ${isActive("/")}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/countryblogs"
              className={`py-2 px-1 hover:bg-gray-100 rounded ${isActive(
                "/countryblogs"
              )}`}
              onClick={() => setIsMenuOpen(false)}
            >
              Countries
            </Link>
          </div>

          <div className="flex space-x-4 pt-2 pb-1">
            {isLoggedIn ? (
              <>
                <div className="flex-1 px-4 py-2 text-center text-gray-700 border border-gray-300 rounded">
                  <span className="mr-2">👤</span>
                  {userName}
                </div>
                <button
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2 text-center bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="flex-1 px-4 py-2 text-center border border-blue-500 text-blue-500 rounded hover:bg-blue-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex-1 px-4 py-2 text-center bg-blue-500 text-white rounded hover:bg-blue-600"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
