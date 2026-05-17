import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { onLoginSuccess } from "../context/useAuthStore";

// Yahan humne environment variable ko ek variable me save kar liya
const API_URL = import.meta.env.VITE_API_URL;

export const register = async ({ username, email, password }) => {
  try {
    // API_URL ko request ke aage jod diya
    const res = await axios.post(`${API_URL}/api/auth/register`, {
      username,
      password,
      email,
    });

    toast.success(res.data.message);

    return res.data;
  } catch (error) {
    const msg = error.response?.data?.message || error.message;

    toast.error(msg);

    return { success: false, message: msg };
  }
};

export const login = async ({ email, password }) => {
  try {
    // API_URL ko request ke aage jod diya
    const res = await axios.post(`${API_URL}/api/auth/login`, {
      email,
      password,
    });

    const token = res.data.data;

    localStorage.setItem("token", token);
    onLoginSuccess(token);

    const decoded = jwtDecode(token);

    toast.success(`Logged in as ${decoded.username}`);

    return res.data;
  } catch (error) {
    const msg = error.response?.data?.message || error.message;

    toast.error(msg);

    return { success: false, message: msg };
  }
};