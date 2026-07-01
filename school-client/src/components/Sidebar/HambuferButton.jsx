// src/components/HamburgerButton.jsx
import React from "react";
import { Icon } from "@iconify/react";

const HamburgerButton = ({ isOpen, onToggle }) => {
  return (
    <button
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      onClick={onToggle}
      className="md:hidden fixed top-4 left-4 z-[1100] p-2 rounded-md bg-white shadow-md border border-gray-200"
    >
      <Icon icon={isOpen ? "fa-solid:times" : "fa-solid:bars"} className="text-gray-700 text-lg" />
    </button>
  );
};

export default HamburgerButton;
