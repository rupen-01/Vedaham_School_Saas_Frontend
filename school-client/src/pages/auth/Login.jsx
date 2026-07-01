
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import ApiConfig from "../../config/ApiConfig";
import axios from "axios";
import Cookies from "js-cookie";

// Login API request
const loginRequest = async ({ email, password }) => {
  try {
    const res = await axios.post(ApiConfig.LOGIN, { email, password });
    return res.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      throw new Error("No response from server. Please try again.");
    } else {
      throw new Error(error.message || "An error occurred");
    }
  }
};

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: loginRequest,
    onSuccess: (data) => {
      // ✅ Store tokens & user in cookies
      Cookies.set("accessToken", data.data.accessToken, { expires: 1 / 24, secure: true }); // 1 hour
      Cookies.set("refreshToken", data.data.refreshToken, { expires: 1, secure: true }); // 7 days
      Cookies.set("user", JSON.stringify(data.user), { expires: 1, secure: true });
      Cookies.set("isLoggedIn", "true", { expires: 1, secure: true });

      console.log("🔐 AccessToken stored:", Cookies.get("accessToken"));
      console.log("🔐 RefreshToken stored:", Cookies.get("refreshToken"));

      navigate("/");
    },
    onError: (error) => {
      alert(error.message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ email, password });
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">
            Sign In
          </h2>
          <p className="text-center text-gray-500">
            Welcome back! School Panel.
          </p>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <FloatingLabelInput
              type="email"
              label="Email"
              icon={Mail}
              value={email}
              onChange={setEmail}
            />
            <FloatingLabelPassword
              label="Password"
              icon={Lock}
              value={password}
              onChange={setPassword}
            />
            <div className="text-right text-xs text-indigo-500 mt-1 cursor-pointer">
              Forgot Password?
            </div>
            <button
              type="submit"
              disabled={mutation.isLoading}
              className="w-1/3 py-2 px-4 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md disabled:opacity-50"
            >
              {mutation.isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>

      <div className="hidden lg:flex items-center justify-center bg-indigo-50">
        <div className="text-center px-8">
          <img
            src="https://usermanual.skoolerp.in/assets/images/Dashboard_V3.5.png"
            alt="School Panel Preview"
            className="rounded-lg shadow-md max-w-sm"
          />
          <h3 className="text-2xl font-semibold mt-6 text-indigo-800">
            School Management Panel
          </h3>
          <p className="mt-2 text-gray-500 text-sm">
            Centralized school ERP system for managing students, staff, fees, and academics.
            <br />
            Get real-time insights, improve efficiency, and simplify administrative tasks.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

// ---------------------------
// Input Components
// ---------------------------
const FloatingLabelInput = ({ type, label, icon: Icon, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value.length > 0;

  return (
    <div className="relative w-full mb-6">
      <div className="absolute left-3 top-3 text-gray-400">
        <Icon size={20} />
      </div>
      <input
        type={type}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className="peer pl-12 pt-4 pb-2 w-full border rounded-md shadow-sm focus:outline-none ring-gray-200 border-gray-300 focus:ring focus:ring-indigo-400 focus:border-indigo-400 transition-all"
        placeholder=" "
      />
      <label
        className={`absolute left-12 font-semibold transition-all duration-200 pointer-events-none ${
          isFloating
            ? "-top-2 bg-white text-xs text-indigo-400 px-1"
            : "top-[16px] text-sm text-gray-500"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

const FloatingLabelPassword = ({ label, icon: Icon, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const isFloating = focused || value.length > 0;

  return (
    <div className="relative w-full mb-6">
      <div className="absolute left-3 top-3 text-gray-400">
        <Icon size={20} />
      </div>
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => onChange(e.target.value)}
        className="peer pl-12 pr-12 pt-4 pb-2 w-full border rounded-md shadow-sm focus:outline-none ring-gray-200 border-gray-300 focus:ring focus:ring-indigo-400 focus:border-indigo-400 transition-all"
        placeholder=" "
      />
      <label
        className={`absolute left-12 font-semibold transition-all duration-200 pointer-events-none ${
          isFloating
            ? "-top-2 bg-white text-xs text-indigo-400 px-1"
            : "top-[16px] text-sm text-gray-500"
        }`}
      >
        {label}
      </label>
      <div
        className="absolute right-3 top-3 text-gray-400 cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
      </div>
    </div>
  );
};
