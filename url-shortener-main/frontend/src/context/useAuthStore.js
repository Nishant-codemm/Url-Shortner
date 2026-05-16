import {create} from "zustand";
import {persist} from "zustand/middleware";
import {jwtDecode} from "jwt-decode"


export const useAuthStore = create(
  persist(
    (set) => ({
      token: null,
      user: null,

      setAuth: (token, user) => set({ token, user }),
      clearAuth: () => set({ token: null, user: null }),
    }),
    {
      name: "auth",
    }
  )
);

export const onLoginSuccess = (token) => {
  try {
    const decoded = jwtDecode(token);

    useAuthStore.getState().setAuth(token, {
      id: decoded.id,
      email: decoded.email,
      username: decoded.username,
      role: decoded.role,
    });
  } catch (err) {
    console.error("Invalid token", err);
    useAuthStore.getState().clearAuth();
  }
};


