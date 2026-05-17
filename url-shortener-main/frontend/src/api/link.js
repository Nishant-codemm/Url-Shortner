import axios from "axios";
import { toast } from "react-toastify";

const API_URL = import.meta.env.VITE_API_URL || "";

export const createLink = async ({ fullUrl, userSlug }) => {
  try {
    const size = 8;

    // Payload banate waqt check karenge
    const payload = {
      fullUrl,
      size,
    };

    // Agar userSlug me kuch type kiya hai tabhi payload me add karo
    if (userSlug && userSlug.trim() !== "") {
      payload.userSlug = userSlug.trim();
    }

    const res = await axios.post(
      `${API_URL}/link`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    toast.error(msg);
    return { success: false, message: msg };
  }
};

export const getLinks = async () => {
  try {
    const res = await axios.get(`${API_URL}/link`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return res.data;
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    toast.error(msg);
    return { success: false, message: msg };
  }
};

export const deleteLinks = async ({ id, fullUrl }) => {
  try {
    const res = await axios.delete(
      `${API_URL}/link`,
      {
        data: {
          search: id ? { id } : { fullUrl },
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    toast.success(res.data.message);
    return res.data;
  } catch (error) {
    const msg = error.response?.data?.message || error.message;
    toast.error(msg);
    return { success: false, message: msg };
  }
};

export const fetchLinkAnalytics = async (id) => {
  const res = await axios.get(
    `${API_URL}/analytics?linkId=${id}`,
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return res.data;
};