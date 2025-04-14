import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Welcome to Healthcare App</h1>
          <p className="text-xl mb-8">
            Book appointments with the best doctors and manage your health
            effortlessly.
          </p>
          <Link
            to="/book-appointment"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-50 transition duration-300"
          >
            Book an Appointment
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-bold mb-4">Easy Booking</h3>
            <p className="text-gray-600">
              Book appointments with top doctors in just a few clicks.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">⚕️</div>
            <h3 className="text-xl font-bold mb-4">Expert Doctors</h3>
            <p className="text-gray-600">
              Access a network of highly qualified and experienced doctors.
            </p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg text-center">
            <div className="text-4xl mb-4">📱</div>
            <h3 className="text-xl font-bold mb-4">24/7 Support</h3>
            <p className="text-gray-600">
              Get support anytime, anywhere with our dedicated team.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">1</div>
              <h3 className="text-xl font-bold mb-4">Sign Up</h3>
              <p className="text-gray-600">
                Create an account to get started.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">2</div>
              <h3 className="text-xl font-bold mb-4">Book an Appointment</h3>
              <p className="text-gray-600">
                Choose a doctor and book your appointment.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="text-4xl mb-4">3</div>
              <h3 className="text-xl font-bold mb-4">Manage Your Health</h3>
              <p className="text-gray-600">
                Track your appointments and health records.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="container mx-auto py-16">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">
              "This app has made it so easy to book appointments with my doctor.
              Highly recommended!"
            </p>
            <p className="font-semibold">- John Doe</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">
              "The doctors are very professional, and the support team is always
              helpful."
            </p>
            <p className="font-semibold">- Jane Smith</p>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">
              "I love how I can manage all my health records in one place. Great
              app!"
            </p>
            <p className="font-semibold">- Michael Johnson</p>
          </div>
        </div>
      </div>

      
    </div>
  );
};

export default Home;