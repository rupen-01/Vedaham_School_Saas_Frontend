import { Icon } from "@iconify/react";
import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const user = {
  name: "Aaron Cooper",
  role: "Super-Admin",
  avatar:
    "https://www.kindpng.com/picc/m/780-7804962_cartoon-avatar-png-image-transparent-avatar-user-image.png",
};

const Header = ({ setIsCollapsed }) => {
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("isLoggedIn")
  );
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div className="flex items-center justify-between shadow-md px-7 py-3 bg-white/80 relative">
      <div className="flex items-center gap-3">
        {/* Menu Button */}
        <button
          onClick={() => setIsCollapsed(false)}
          className="lg:hidden block items-center justify-center p-2 rounded-full text-gray-500 transition hover:bg-gray-200"
        >
          <svg
            focusable="false"
            aria-hidden="true"
            viewBox="0 0 24 24"
            style={{
              userSelect: "none",
              width: "1em",
              height: "24px",
              display: "block",
              flexShrink: 0,
              fill: "rgb(99, 115, 129)",
            }}
          >
            <path
              opacity="0.32"
              d="M15.7798 4.5H5.2202C4.27169 4.5 3.5 5.06057 3.5 5.75042C3.5 6.43943 4.27169 7 5.2202 7H15.7798C16.7283 7 17.5 6.43943 17.5 5.75042C17.5 5.06054 16.7283 4.5 15.7798 4.5Z"
            ></path>
            <path d="M18.7798 10.75H8.2202C7.27169 10.75 6.5 11.3106 6.5 12.0004C6.5 12.6894 7.27169 13.25 8.2202 13.25H18.7798C19.7283 13.25 20.5 12.6894 20.5 12.0004C20.5 11.3105 19.7283 10.75 18.7798 10.75Z"></path>
            <path d="M15.7798 17H5.2202C4.27169 17 3.5 17.5606 3.5 18.2504C3.5 18.9394 4.27169 19.5 5.2202 19.5H15.7798C16.7283 19.5 17.5 18.9394 17.5 18.2504C17.5 17.5606 16.7283 17 15.7798 17Z"></path>
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-3">
        {/* Notification */}
        <button className="w-10 h-10 rounded-full bg-gray-100 flex items-center cursor-pointer justify-center shadow">
          <Icon icon="solar:bell-bold" className="text-gray-500 w-6 h-6" />
        </button>

        {isAuthenticated ? (
          // Profile & Logout
          <button
            className="hover:rounded-md hover:shadow-md cursor-pointer flex items-center gap-2.5 px-1.5 py-[3px]"
            onClick={() => setOpen((v) => !v)}
          >
            <div className="relative">
              <div className="w-11 h-11 rounded-full bg-gray-100 flex items-center justify-center shadow border-2 border-transparent transition">
                <img
                  src={user.avatar}
                  alt="Profile Image"
                  className="w-10 h-10 rounded-full object-cover object-center"
                />
              </div>

              {open && (
                <div
                  ref={dropdownRef}
                  className="absolute -right-24 overflow-hidden mt-3 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 flex flex-col z-50"
                >
                  <div className="flex items-center px-3 gap-x-3 pt-6 pb-3">
                    <img
                      src={user.avatar}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover object-center"
                    />
                    <div>
                      <div className="font-semibold text-left text-gray-900 text-sm">
                        {user.name}
                      </div>
                      <div className="text-gray-500 text-left text-xs mb-1">
                        {user.role}
                      </div>
                    </div>
                  </div>
                  <div className="border-t border-gray-300 flex flex-col">
                    <button className="w-full text-left px-6 py-2.5 cursor-pointer text-sm hover:bg-gray-50 text-gray-700 font-medium">
                      Settings
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-6 py-2.5 cursor-pointer text-sm hover:bg-gray-50 text-red-500 font-medium"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Profile Info with dropdown icon */}
            <div className="flex items-center gap-1">
              <div className="text-left">
                <div className="font-medium text-sm tracking-wide">
                  {user.name}
                </div>
                <div className="text-[10px] text-gray-500 tracking-wider">
                  {user.role.toUpperCase()}
                </div>
              </div>
              <Icon
                icon={open ? "mdi:chevron-up" : "mdi:chevron-down"}
                className="text-gray-500 w-4 h-4"
              />
            </div>
          </button>
        ) : (
          // Login Button
          <button
            onClick={handleLogin}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow hover:bg-blue-600 cursor-pointer"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;
