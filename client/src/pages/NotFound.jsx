import React, { useEffect, useState } from "react";
import { Search, AlertCircle, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const [showElements, setShowElements] = useState(false);

  useEffect(() => {
    setShowElements(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 px-4">
      <div
        className={`transform transition-all duration-700 ${
          showElements
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex items-center justify-center">
          <div className="relative">
            <Search className="text-gray-400 w-24 h-24 md:w-32 md:h-32 animate-pulse" />
            <AlertCircle className="text-red-500 w-12 h-12 md:w-16 md:h-16 absolute -top-2 -right-2 animate-bounce" />
          </div>
        </div>
      </div>

      <h1
        className={`mt-8 text-5xl md:text-6xl font-bold text-gray-900 transition-all duration-700 delay-300 ${
          showElements
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        404
      </h1>

      <h2
        className={`mt-4 text-2xl md:text-3xl font-semibold text-gray-700 transition-all duration-700 delay-500 ${
          showElements
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        Page Not Found
      </h2>

      <p
        className={`mt-4 text-center text-gray-600 max-w-md transition-all duration-700 delay-700 ${
          showElements
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        The page you're looking for doesn't exist or has been moved to another
        URL.
      </p>

      <div
        className={`mt-8 transition-all duration-700 delay-900 ${
          showElements
            ? "translate-y-0 opacity-100"
            : "translate-y-10 opacity-0"
        }`}
      >
        <a
          href="/"
          className="flex items-center px-6 py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transform transition-all duration-300 hover:scale-105"
        >
          <ArrowLeft className="mr-2 w-5 h-5" />
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
