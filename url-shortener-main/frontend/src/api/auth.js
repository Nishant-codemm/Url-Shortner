import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { toast } from "react-toastify";
import { onLoginSuccess } from "../context/useAuthStore";

export const register = async ({ username, email, password }) => {
  try {
    const res = await axios.post("/api/auth/register", {
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
    const res = await axios.post("/api/auth/login", {
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
