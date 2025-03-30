import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  //convert json okay
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const user = localStorage.getItem("user");

    if (accessToken && user) {
      setIsLoggedIn(true);
      try {
        const userData = JSON.parse(user);
        setUserName(userData.name || userData.username || "Traveler");
      } catch (e) {
        setUserName(user);
      }
    }
  }, []);

  //home page se direct countries page par
  const handleExploreClick = () => {
    navigate("/countryblogs");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h1 className="text-5xl md:text-6xl font-bold text-blue-600 mb-6">
            {isLoggedIn ? (
              <>
                Welcome back, <span className="text-blue-800">{userName}</span>!
              </>
            ) : (
              "Welcome to SkyTrails"
            )}
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Discover amazing destinations and travel experiences from around the
            world. Join our community of global explorers and share your own
            journey.
          </p>

          <button
            onClick={handleExploreClick}
            className="px-8 py-4 bg-blue-600 text-white text-xl rounded-lg shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
          >
            Explore Country Blogs
          </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">✈️</div>
            <h3 className="text-xl font-semibold mb-2">Travel Guides</h3>
            <p className="text-gray-600">
              Detailed guides for popular destinations with local insights
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">🌏</div>
            <h3 className="text-xl font-semibold mb-2">Global Community</h3>
            <p className="text-gray-600">
              Connect with fellow travelers and share your experiences
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="text-4xl mb-4">📸</div>
            <h3 className="text-xl font-semibold mb-2">Photo Journals</h3>
            <p className="text-gray-600">
              Browse stunning photography from destinations worldwide
            </p>
          </div>
        </div>

        {!isLoggedIn && (
          <div className="bg-blue-50 p-8 rounded-xl border border-blue-100 max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4">
              Join Our Travel Community
            </h2>
            <p className="text-gray-700 mb-6">
              Create an account to share your own travel stories, save favorite
              destinations, and connect with travelers from around the world.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/login"
                className="px-6 py-3 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Register Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
