import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const REQUEST = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // send cookies with every request
});

// Attach token
REQUEST.interceptors.request.use((config) => {
    // In Next.js we read from localStorage only on client side
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Flatten response
/*
  API returns:
  { statusCode: 200, data: { ... }, message: "Success", success: true }

  Axios wraps it as:
  response.data = { statusCode, data, message, success }

  We want:
  response.data = { ... }  ← just the actual data
*/
REQUEST.interceptors.response.use(
    (response) => {
        const apiResponse = response.data;
        if (apiResponse?.data !== undefined) {
            response.data = apiResponse.data;
        }
        return response;
    },
    (error) => {
        console.error("API Error:", error.message);

        // AUTO LOGOUT on 401
        if (error.response?.status === 401 && typeof window !== "undefined") {
            console.log("Unauthorized — clearing token");
            localStorage.removeItem("accessToken");
            window.location.href = "/login";
        }

        if (error.response?.status === 403) {
            console.error("Forbidden access");
        }

        if (error.response?.status === 500) {
            console.error("Server error");
        }

        return Promise.reject(error);
    }
);

export default REQUEST;