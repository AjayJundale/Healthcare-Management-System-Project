import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import BookAppointment from "./pages/BookAppointment";
import AppointmentHistory from "./pages/AppointmentHistory";
import ManageAvailability from "./pages/ManageAvailability";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import ManageUsers from "./pages/ManageUsers";
import ManageAppointments from "./pages/ManageAppointments";
import Navbar from "./components/Navbar";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import SuccessPage from "./pages/SuccessPage";
import DoctorAppointments from "./pages/DoctorAppointments";
import Footer from "./pages/Footer";
import RescheduleAppointment from "./pages/RescheduleAppointment";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";
import ExportData from "./pages/ExportData";

function App() {
  return (
    <Router>
      <ErrorBoundary>
        <Navbar />
        <ScrollToTop />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/success" element={<SuccessPage />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute roles={["patient", "doctor", "admin"]} />}>
            <Route path="/dashboard" element={<Dashboard />} />
          </Route>

          {/* Patient Routes */}
          <Route element={<ProtectedRoute roles={["patient"]} />}>
            <Route path="/book-appointment" element={<BookAppointment />} />
            <Route path="/appointment-history" element={<AppointmentHistory />} />
            <Route path="/reschedule-appointment/:id" element={<RescheduleAppointment />} />
          </Route>

          {/* Doctor Routes */}
          <Route element={<ProtectedRoute roles={["doctor"]} />}>
            <Route path="/manage-availability" element={<ManageAvailability />} />
            <Route path="/doctor-appointments" element={<DoctorAppointments />} />
          </Route>

          {/* Admin Routes */}
          <Route element={<ProtectedRoute roles={["admin"]} />}>
            <Route path="/manage-users" element={<ManageUsers />} />
            <Route path="/manage-appointments" element={<ManageAppointments />} />
            <Route path="/export-data" element={<ExportData />} />
          </Route>

          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
        <ToastContainer />
      </ErrorBoundary>
    </Router>
  );
}

export default App;