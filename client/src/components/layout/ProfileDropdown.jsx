import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, LogOut, ChevronDown } from 'lucide-react';

function ProfileDropdown({ username, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const firstLetter = username ? username.charAt(0).toUpperCase() : 'U';

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2.5 group focus:outline-none cursor-pointer"
      >
        <div className="w-10 h-10 bg-linear-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-all duration-300">
          {firstLetter}
        </div>
        <ChevronDown className="w-4 h-4 text-gray-400 transition-transform duration-300" />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-100 py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900 truncate">@{username}</p>
          </div>
          
          <Link
            to="/profile"
            className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-violet-50 hover:text-violet-600 transition-colors"
            onClick={() => setIsOpen(false)}
          >
            <User className="w-4 h-4 mr-2" />
            View Profile
          </Link>

          <button
            onClick={() => {
              setIsOpen(false);
              onLogout();
            }}
            className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium border-t border-gray-50 mt-1 cursor-pointer"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}

export default ProfileDropdown;
