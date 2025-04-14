// components/LoadingSpinner.jsx
useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/appointment/history`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setAppointments(response.data);
      } catch (error) {
        toast.error("Failed to fetch appointments. Please try again.");
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };
  
    fetchAppointments();
  }, []); // Ensure this dependency array is correct
const LoadingSpinner = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  };
  
  export default LoadingSpinner;