import { useState } from "react";
import Navbar from "../components/Navbar";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { registerSchema } from "../validation/authSchema";
import { register as registerUser } from "../api/auth";
import { useNavigate } from "react-router";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (values) => {
    setLoading(true);

    const res = await registerUser(values);

    setLoading(false);

    if (!res.success) return;

    nav("/login")

  };

  return (
    <div className="min-h-screen bg-black-950 text-gray-100">
      {/* <Navbar /> */}

      <div className="max-w-md mx-auto mt-10 px-6">

        <h2 className="text-4xl font-bold text-center tracking-tight text-gray-100">
          Create an Account
        </h2>
        <p className="text-center text-gray-400 mt-2 text-base">
          Join and start creating short links with analytics.
        </p>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="
            mt-10 p-8 rounded-2xl
            bg-black-900/40 dark:bg-black-900/50
            border border-gray-800
            backdrop-blur-xl shadow-xl
          "
        >
          {/* Username */}
          <div className="mb-5">
            <label className="block text-sm mb-1 text-gray-300">Username</label>
            <input
              type="text"
              {...register("username")}
              className="
                w-full px-5 py-3.5 rounded-xl
                bg-black-800 text-gray-100
                placeholder-gray-500
                border border-gray-700
                focus:border-blue-500 focus:ring-blue-500
                outline-none transition
              "
              placeholder="Your username"
            />
            <p className="text-red-400 text-sm">{errors.username?.message}</p>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm mb-1 text-gray-300">Email</label>
            <input
              type="email"
              {...register("email")}
              className="
                w-full px-5 py-3.5 rounded-xl
                bg-black-800 text-gray-100
                placeholder-gray-500
                border border-gray-700
                focus:border-blue-500 focus:ring-blue-500
                outline-none transition
              "
              placeholder="you@example.com"
            />
            <p className="text-red-400 text-sm">{errors.email?.message}</p>
          </div>

          {/* Password */}
          <div className="mb-5">
            <label className="block text-sm mb-1 text-gray-300">Password</label>
            <input
              type="password"
              {...register("password")}
              className="
                w-full px-5 py-3.5 rounded-xl
                bg-black-800 text-gray-100
                placeholder-gray-500
                border border-gray-700
                focus:border-blue-500 focus:ring-blue-500
                outline-none transition
              "
              placeholder="••••••••"
            />
            <p className="text-red-400 text-sm">{errors.password?.message}</p>
          </div>

          {/* Button */}
          <button
            disabled={loading}
            className="
              w-full py-3.5 rounded-xl
              bg-blue-600 hover:bg-blue-500
              text-white font-semibold
              transition-all shadow-sm hover:shadow-blue-500/20
            "
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>

        <p className="mt-8 pb-10 text-center text-sm text-gray-400">
          Already have an account?{" "}
          <a href="/login" className="text-blue-400 font-semibold hover:underline">
            Login
          </a>
        </p>
      </div>
    </div>
  );
}
