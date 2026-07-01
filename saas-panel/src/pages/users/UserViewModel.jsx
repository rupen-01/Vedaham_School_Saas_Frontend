import React from "react";
import { X } from "lucide-react";
import { Icon } from "@iconify/react";

const UserViewModal = ({ isOpen, onClose, user }) => {
  if (!isOpen || !user) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-xl p-6 relative animate-fadeIn">
        
        {/* Close Button */}
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 bg-gray-200 w-8 h-8 flex items-center justify-center rounded-full transition"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-4 border-b pb-4 mb-4">
          <div className="w-14 h-14 rounded-full bg-indigo-600 text-white flex items-center justify-center text-xl font-semibold shadow">
            {user.name?.charAt(0)}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{user.name}</h2>
            <p className="text-sm text-gray-500">{user.role}</p>
          </div>
        </div>

        {/* Basic Details */}
        <div className="text-sm space-y-4">
          <div className="flex items-center gap-2 text-gray-700">
            <Icon icon="mdi:account" className="text-indigo-600 w-5 h-5" />
            <span className="font-medium">Full Name:</span>
            <span className="text-gray-900">{user.name}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Icon icon="mdi:email-outline" className="text-indigo-600 w-5 h-5" />
            <span className="font-medium">Email:</span>
            <span className="text-gray-900">{user.email}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Icon icon="mdi:phone-outline" className="text-indigo-600 w-5 h-5" />
            <span className="font-medium">Phone:</span>
            <span className="text-gray-900">{user.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-700">
            <Icon icon="mdi:checkbox-marked-circle-outline" className="text-indigo-600 w-5 h-5" />
            <span className="font-medium">Status:</span>
            <span
              className={`text-sm font-semibold px-2 py-0.5 rounded ${
                user.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {user.status}
            </span>
          </div>
        </div>

        {/* Permissions */}
      
           <div className="mt-6">
          <p className="font-bold text-gray-800 mb-2 flex items-center gap-2">  
            <Icon icon="mdi:lock-outline" className="text-indigo-600 w-5 h-5" /> 
            Module Permissions</p>
          <div className="bg-gray-100 rounded-md p-4 grid grid-cols-2 gap-y-2 text-sm text-gray-700">
            {user.permissions?.map((perm, idx) => (
              <React.Fragment key={idx}>
                <div className="flex items-center gap-2 text-gray-500">
                  <Icon icon="mdi:folder-outline" className="text-indigo-500 w-4 h-4" />
                  Module Name
                </div>
                <div className="font-medium text-gray-800">{perm}</div>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserViewModal;
