import React from "react";
import { Link } from "react-router-dom";

const SuccessPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Password Reset Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your password has been successfully reset. You can now log in with your new password.
        </p>
        <Link
          to="/login"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Go to Login
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;