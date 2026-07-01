import React, { useState } from "react";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import ApiConfig from "../../config/ApiConfig";
import axios from "axios";
import Pop from "../../components/common/pop";
import { Mail, Lock, User, Phone, Shield, FileText, Upload } from "lucide-react";
import { Link } from "react-router-dom";

// Floating Label Input Component
const FloatingLabelInput = ({ type, label, icon: IconComp, value, onChange, name, required = false }) => {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value;

  return (
    <div className="relative w-full mb-6">
      <div className="absolute left-3 top-3 text-gray-400">
        <IconComp size={22} />
      </div>
      <input
        name={name}
        type={type}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={onChange}
        className="peer pl-10 pt-4 pb-2 w-full border rounded-lg shadow-sm focus:outline-none border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all"
        placeholder=" "
        required={required}
      />
      <label
        className={`absolute left-10 text-gray-500 text-sm transition-all duration-200 font-medium pointer-events-none ${
          isFloating
            ? "-top-2 bg-white text-xs text-indigo-500 px-1"
            : "top-[14px] text-sm"
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};

// Floating Label Select Component
const FloatingLabelSelect = ({ label, icon: IconComp, value, onChange, name, options, required = false }) => {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value;

  return (
    <div className="relative w-full mb-6">
      <div className="absolute left-3 top-3 text-gray-400">
        <IconComp size={22} />
      </div>
      <select
        name={name}
        value={value}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={onChange}
        className="peer pl-10 pt-4 pb-2 w-full border rounded-lg shadow-sm focus:outline-none border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all"
        required={required}
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <label
        className={`absolute left-10 text-gray-500 text-sm transition-all duration-200 font-medium pointer-events-none ${
          isFloating
            ? "-top-2 bg-white text-xs text-indigo-500 px-1"
            : "top-[14px] text-sm"
        }`}
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
    </div>
  );
};

// Image Upload Component
const ImageUploadField = ({ label, value, onChange, name }) => {
  const [focused, setFocused] = useState(false);
  const isFloating = focused || value;

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      onChange({ target: { name, value: file } });
    }
  };

  return (
    <div className="relative w-full mb-6">
      <div className="absolute left-3 top-3 text-gray-400">
        <Upload size={22} />
      </div>
      <input
        name={name}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer pl-10 pt-4 pb-2 w-full border rounded-lg shadow-sm focus:outline-none border-gray-300 focus:border-indigo-500 focus:ring focus:ring-indigo-200 transition-all"
      />
      <label
        className={`absolute left-10 text-gray-500 text-sm transition-all duration-200 font-medium pointer-events-none ${
          isFloating
            ? "-top-2 bg-white text-xs text-indigo-500 px-1"
            : "top-[14px] text-sm"
        }`}
      >
        {label}
      </label>
      {value && (
        <p className="text-xs text-green-600 mt-1 ml-10">
          File selected: {value.name}
        </p>
      )}
    </div>
  );
};

export default function Register() {
  const [formData, setFormData] = useState({ 
    email: "", 
    password: "",
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    mobileNumber: "",
    role: "",
    rolePermission: "",
    status: "",
    notes: "",
    adminImage: null
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Role options
  const roleOptions = [
    { value: "super-admin", label: "Super Admin" },
    { value: "technical-admin", label: "Technical Admin" },
    { value: "support-agent", label: "Support Agent" },
    { value: "sales", label: "Sales" }
  ];

  // Role Permission options
  const rolePermissionOptions = [
    { value: "all", label: "All Permissions" },
    { value: "read", label: "Read Only" },
    { value: "write", label: "Read & Write" },
    { value: "limited", label: "Limited Access" }
  ];

  // Status options
  const statusOptions = [
    { value: "true", label: "Active" },
    { value: "false", label: "Inactive" }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create FormData for multipart form submission (to handle image upload)
      const submitData = new FormData();
      
      // Add all form fields to FormData
      Object.keys(formData).forEach(key => {
        if (formData[key] !== null && formData[key] !== "") {
          submitData.append(key, formData[key]);
        }
      });

      await axios.post(ApiConfig.REGISTER, submitData, {
        headers: { 
          "Content-Type": "multipart/form-data",
        },
      });
      Pop("success", "Registration Successful!");
    } catch (err) {
      console.error(err);
      Pop("error", "Registration Failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col gap-5 items-center justify-center bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-100 p-4">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-6xl h-[90vh] relative overflow-hidden flex"
      >
        {/* Left Purple Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-purple-600 p-12 flex flex-col justify-between w-1/2 relative"
        >
          {/* Decorative Shapes */}
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: -45 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute bottom-0 left-0 w-32 h-32 bg-purple-300 rounded-full opacity-20"
          />
          <motion.div
            initial={{ scale: 0, rotate: 45 }}
            animate={{ scale: 1, rotate: 45 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="absolute top-1/2 left-0 w-24 h-24 bg-purple-400 rounded-lg opacity-20"
          />
          
          {/* Logo */}
          <div className="flex items-center gap-2 mb-8">
            <Icon icon="mdi:school" className="text-2xl text-white" />
            <span className="text-white text-xl font-bold">School ERP</span>
          </div>
          
          {/* Main Content */}
          <div className="text-center">
            <h2 className="text-4xl font-bold text-white mb-4">Already a member?</h2>
            <p className="text-purple-100 text-lg mb-8">
              To keep track on your dashboard please login with your personal info
            </p>
            <Link 
              to="/login"
              className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-colors"
            >
              Login
            </Link>
          </div>
        </motion.div>

        {/* Right White Section */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="w-1/2 p-12 flex flex-col overflow-y-auto max-h-full"
        >
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-purple-600 mb-6">Create Account</h2>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex-1 flex flex-col min-h-0">
            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <FloatingLabelInput
                  type="text"
                  label="First Name"
                  icon={User}
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleChange}
                  required={true}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <FloatingLabelInput
                  type="text"
                  label="Last Name"
                  icon={User}
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleChange}
                  required={true}
                />
              </motion.div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <FloatingLabelInput
                  type="date"
                  label="Date of Birth"
                  icon={User}
                  name="dateOfBirth"
                  value={formData.dateOfBirth || ""}
                  onChange={handleChange}
                  required={true}
                />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex flex-col"
              >
                <label className="text-sm text-gray-600 mb-2">Gender</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      checked={formData.gender === "male"}
                      onChange={handleChange}
                      className="text-purple-600"
                    />
                    <span className="text-sm">Male</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      checked={formData.gender === "female"}
                      onChange={handleChange}
                      className="text-purple-600"
                    />
                    <span className="text-sm">Female</span>
                  </label>
                </div>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <FloatingLabelInput
                type="email"
                label="Email"
                icon={Mail}
                name="email"
                value={formData.email}
                onChange={handleChange}
                required={true}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.0 }}
            >
              <FloatingLabelInput
                type="tel"
                label="Mobile Number"
                icon={Phone}
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
                required={true}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              <FloatingLabelInput
                type="password"
                label="Password"
                icon={Lock}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required={true}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <FloatingLabelSelect
                label="Role"
                icon={Shield}
                name="role"
                value={formData.role}
                onChange={handleChange}
                options={roleOptions}
                required={true}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
            >
              <FloatingLabelSelect
                label="Role Permission"
                icon={Shield}
                name="rolePermission"
                value={formData.rolePermission}
                onChange={handleChange}
                options={rolePermissionOptions}
                required={true}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <FloatingLabelSelect
                label="Status"
                icon={Shield}
                name="status"
                value={formData.status}
                onChange={handleChange}
                options={statusOptions}
                required={true}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.5 }}
            >
              <FloatingLabelInput
                type="text"
                label="Notes"
                icon={FileText}
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                required={true}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.6 }}
            >
              <ImageUploadField
                label="Admin Image"
                name="adminImage"
                value={formData.adminImage}
                onChange={handleChange}
              />
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none mt-8"
            >
              {loading ? (
                <Icon icon="eos-icons:loading" className="animate-spin text-2xl" />
              ) : (
                "Register"
              )}
            </motion.button>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}
