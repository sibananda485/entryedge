import axios from "axios";

axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    if (
      error.response &&
      error.response.status === 401 &&
      error.response.data.message == "Invaid Token"
    ) {
      // Handle token expiration or unauthorized access

      localStorage.removeItem("token"); // Clear the token
      window.location.href = "/"; // Redirect to login page
    }
    return Promise.reject(error);
  }
);
