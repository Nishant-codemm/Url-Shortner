import { useNavigate } from "react-router";
import ThemeToggle from "./ThemeToggle";
import { toast } from "react-toastify";
export default function Navbar() {
  const nav = useNavigate();
  const token = localStorage.getItem("token");

  return (
    <nav
      className="
        w-full sticky top-0 z-40
        backdrop-blur-lg
        bg-black-900/40 dark:bg-black-900/60
        border-b border-gray-800/60
      "
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* Brand */}
        <h1
          className="text-xl font-semibold text-gray-100 tracking-tight cursor-pointer"
          onClick={() => nav("/")}
        >
          URL<span className="text-blue-500">Shortener</span>
        </h1>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {!token && (
            <>
              <button
                className="
                  text-sm font-medium
                  text-gray-300 hover:text-blue-400
                  transition-colors
                  cursor-pointer
                "
                onClick={() => nav("/login")}
              >
                Login
              </button>

              <button
                className="
                  text-sm font-medium
                  px-4 py-1.5 rounded-lg
                  bg-blue-500 hover:bg-blue-600
                  text-white
                  shadow-sm transition-all
                  cursor-pointer
                "
                onClick={() => nav("/register")}
              >
                Register
              </button>
            </>
          )}
          {token && (
            <>
              <button
                className="
                  text-sm font-medium
                  text-gray-300 hover:text-blue-400
                  transition-colors
                  cursor-pointer
                "
                onClick={() => { localStorage.removeItem("token"); nav("/login");toast.success("Logged out") }}

              >
                Logout
              </button>

              <button
                className="
                  text-sm font-medium
                  px-4 py-1.5 rounded-lg
                  bg-blue-500 hover:bg-blue-600
                  text-white
                  shadow-sm transition-all
                  cursor-pointer
                "
                onClick={() => nav("/dashboard")}
              >
                Dashboard
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
