import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-7xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl text-gray-600 mt-2">Page Not Found</h2>
      <p className="text-gray-500 mt-4 text-center px-4">
        Oops! The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300 ease-in-out"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;