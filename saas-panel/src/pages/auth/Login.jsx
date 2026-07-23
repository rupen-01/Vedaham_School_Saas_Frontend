import React, { useEffect, useState } from 'react';
import { Mail, Lock, Shield } from "lucide-react";
import { Link, useNavigate } from "react-router-dom"
import ApiConfig from '../../config/ApiConfig';
import Cookies from "js-cookie";
import { KeyCofig } from '../../config/KeyConfig';
import CryptoJS from "crypto-js";
import { DecryptUser } from '../../utils/decryptUser';
import { useMutationApi } from '../../utils/useApi';
import Pop from '../../components/common/pop';

const Login = () => {
  const [role, setRole] = useState('super-admin');
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    password: "",
    email: ""
  });

  // Role options
  const roleOptions = [
    { value: "super-admin", label: "Super Admin" },
    { value: "technical-admin", label: "Technical Admin" },
    { value: "support-agent", label: "Support Agent" },
    { value: "sales", label: "Sales" }
  ];

  const loginMutation  = useMutationApi({
    key:"Login",
    url: ApiConfig.LOGIN,
    method: 'POST',
    requireAuth: false,
  })


  const handleLogin = (e) => {
    e.preventDefault();
  
    loginMutation.mutate(
      { payload: { email: formData.email, role: role, password: formData.password } },
      {
        onSuccess: (res) => {
          const encryptUser = CryptoJS.AES.encrypt(
            JSON.stringify(res.data.user),
            KeyCofig.Encrypt_Key
          ).toString();
  
          Pop("success", "Login successful");
  
          Cookies.set("authToken", res.data.accessToken);
          Cookies.set("refreshToken", res.data.refreshToken);
          Cookies.set("user", encryptUser, { secure: true, sameSite: "Strict" });
  
          navigate("/");
        },
        onError: (err) => {
          Pop("error", err.response?.data?.message || "Login failed");
          console.error(err);
        }
      }
    );
  };
  
  useEffect(() => {
    const token = Cookies.get("authToken"); 
    // const token = sessionStorage.getItem('saas_logged_in');
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  }

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left: Login Form */}
      <div className="flex items-center justify-center px-6 py-12">
        <div className="max-w-md w-full space-y-6">
          <h2 className="text-3xl font-semibold text-gray-900 text-center">Sign In</h2>
          <p className="text-center text-gray-500">Welcome back! Saas Panel.</p>

          <form className="space-y-4 mt-4" onSubmit={handleLogin}>
            <FloatingLabelSelect 
              label="Role" 
              icon={Shield} 
              value={role} 
              onChange={handleRoleChange} 
              options={roleOptions} 
            />
            <FloatingLabelInput type="email" name="email" onChange={handleInputChange} label="Email" icon={Mail} value={formData.email} />
            <FloatingLabelInput type="password" name="password" onChange={handleInputChange} label="Password" icon={Lock} value={formData.password} />
            <div className="text-right text-xs text-indigo-500 mt-1 cursor-pointer">Forgot Password?</div>
            <button
              type="submit"
              className="w-1/3 py-2 px-4 cursor-pointer bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md"
            >
              Sign In
            </button>
            <p className="text-center text-sm">
              Don't have an account? <Link to="/register" className="text-indigo-600 cursor-pointer">Sign Up</Link>
            </p>
          </form>
        </div>
      </div>

      {/* Right: Dashboard Preview */}
      <div className="hidden lg:flex items-center justify-center bg-indigo-50">
        <div className="text-center px-8">
          <img src="https://usermanual.skoolerp.in/assets/images/Dashboard_V3.5.png" alt="SaasAble Preview" className="rounded-lg shadow-md max-w-sm" />
          <h3 className="text-2xl font-semibold mt-6 text-indigo-800">SaasAble</h3>
          <p className="mt-2 text-gray-500 text-sm">
            SaaS platform for seamless data management and user insights.<br />
            Unlock growth with real-time analytics and flexible features.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

const FloatingLabelInput = ({ type, label, icon: Icon, value = "", onChange,name }) => {
  const [focused, setFocused] = useState(false);

  const isFloating = focused || value; // yaha current value check karo

  return (
    <div className="relative w-full mb-6">
      <div className="absolute left-3 top-3 text-gray-400">
        <Icon size={25} />
      </div>
      <input
        name={name}
        type={type}
        value={value} // state se bind karo
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={onChange} // lowercase 'o'
        className="peer pl-12 pt-4 pb-2 w-full border rounded-md shadow-sm focus:outline-none ring-gray-200 border-gray-300 focus:ring focus:ring-indigo-400 focus:border-indigo-400 transition-all"
        placeholder=" "
      />
      <label
        className={`absolute left-12 text-gray-500 text-sm transition-all duration-200 font-semibold pointer-events-none ${
          isFloating
            ? "-top-2 bg-white text-xs text-indigo-400"
            : "top-[16px] text-sm"
        }`}
      >
        {label}
      </label>
    </div>
  );
};

const FloatingLabelSelect = ({ label, icon: Icon, value, onChange, options }) => {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value;

  return (
    <div className="relative w-full mb-6">
      <div className="absolute left-3 top-3 text-gray-400">
        <Icon size={25} />
      </div>
      <select
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={onChange}
        className="peer pl-12 pt-4 pb-2 w-full border rounded-md shadow-sm focus:outline-none ring-gray-200 border-gray-300 focus:ring focus:ring-indigo-400 focus:border-indigo-400 transition-all"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        className={`absolute left-12 text-gray-500 text-sm transition-all duration-200 font-semibold pointer-events-none ${
          isFloating
            ? "-top-2 bg-white text-xs text-indigo-400"
            : "top-[16px] text-sm"
        }`}
      >
        {label}
      </label>
    </div>
  );
};
