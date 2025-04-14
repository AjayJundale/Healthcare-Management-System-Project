import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import API from "../utils/api.js"; // Import the API instance

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); // Current page
  const [limit, setLimit] = useState(10); // Users per page
  const [total, setTotal] = useState(0); // Total number of users
  const [pages, setPages] = useState(0); // Total number of pages

  // Fetch users function
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await API.get(`/admin/users?page=${page}&limit=${limit}`); // Include pagination parameters
      setUsers(response.data.users);
      setTotal(response.data.total);
      setPages(response.data.pages);
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  // Fetch users on component mount or when page/limit changes
  useEffect(() => {
    fetchUsers();
  }, [page, limit]);

  // Delete user function
  const handleDeleteUser = async (userId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this user?");
    if (!confirmDelete) return;

    setLoading(true);
    try {
      await API.delete(`/admin/user/${userId}`);
      toast.success("User deleted successfully!");
      await fetchUsers(); // Refresh the list of users after deletion
    } catch (error) {
      toast.error("Failed to delete user");
    } finally {
      setLoading(false);
    }
  };

  // Pagination controls
  const handleNextPage = () => {
    if (page < pages) {
      setPage(page + 1);
    }
  };

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Manage Users</h1>
        <ul className="space-y-4">
          {users.map((user) => (
            <li key={user._id} className="border-b border-gray-200 pb-4">
              <p className="text-gray-800"><strong>Name:</strong> {user.name}</p>
              <p className="text-gray-800"><strong>Email:</strong> {user.email}</p>
              <p className="text-gray-800"><strong>Role:</strong> {user.role}</p>
              <button
                onClick={() => handleDeleteUser(user._id)}
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 flex items-center justify-center"
                disabled={loading}
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                ) : (
                  "Delete"
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Pagination Controls */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={handlePreviousPage}
            disabled={page === 1}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="text-gray-800">
            Page {page} of {pages}
          </span>
          <button
            onClick={handleNextPage}
            disabled={page === pages}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;