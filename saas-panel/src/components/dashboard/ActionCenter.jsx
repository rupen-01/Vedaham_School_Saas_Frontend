import React from 'react';
import { FaPlus, FaUserPlus, FaLink, FaClipboardList } from 'react-icons/fa';

const actions = [
  { label: 'Add Institution', icon: <FaPlus className="text-primary" /> },
  { label: 'Create Plan', icon: <FaClipboardList className="text-primary" /> },
  { label: 'Create User', icon: <FaUserPlus className="text-primary" /> },
  { label: 'Generate Link', icon: <FaLink className="text-accent" /> },
];

const ActionCenter = () => (
  <div className="bg-white shadow-md rounded-xl p-6 flex flex-col w-full">
    <h2 className="text-xl font-semibold text-gray-800 mb-2">Action Center / Quick Links</h2>
    <div className="flex flex-wrap gap-2 mt-2">
      {actions.map(a => (
        <button key={a.label} className="flex items-center gap-2 bg-primary/90 hover:bg-primary text-white rounded-lg px-4 py-2 text-sm font-semibold shadow transition">
          {a.icon} {a.label}
        </button>
      ))}
    </div>
  </div>
);

export default ActionCenter; 