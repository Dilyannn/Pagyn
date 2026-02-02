import { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import ProfileDropdown from "./ProfileDropdown.jsx";

import { Menu, X, BookOpen, LogOut } from "lucide-react";

function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [pfDropdownOpen, setPfDropdownOpen] = useState(false);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  useEffect(() => {
    const handleClickOutside = () => {
      if (pfDropdownOpen) {
        setPfDropdownOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [pfDropdownOpen]);

  return (
    <header>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 bg-linear-to-br from-violet-400 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:from-violet-500 group-hover:to-purple-600 transition-all duration-300 group-hover:scale-105">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-gray-900 tracking-tight">
              Pagyn
            </span>
          </a>

          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="px-4 py-2 text-2sm font-medium text-gray-700 hover:text-violet-600 rounded-lg hover:bg-violet-50/50 transition-all duration-200">
                {link.name}
              </a>
            ))}
          </nav>

          <div className="hidden lg:flex items-center space-x-3">
            {/*Auth btn & pf */}
            {isAuthenticated ? (
              <ProfileDropdown
                isOpen={pfDropdownOpen}
                onToggle={(e) => {
                  e.stopPropagation(); // Prevent event bubbling
                  setPfDropdownOpen(!pfDropdownOpen);
                }}
                avatar={user?.avatar || ""}
                companyName={user?.username || "User"}
                email={user?.email || ""}
                userRole={user?.role || ""}
                onLogout={() => console.log("Logout")}
              />
            ) : (
              <>
                <a 
                  href="/login" 
                  className="px-4 py-2 text-2sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-200">
                  Login
                </a>
                <a 
                  href="/register" 
                  className="px-5 py-2 text-2sm font-medium text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-lg shadow-violet-500/60 hover:shadow-violet-600/40 transition-all duration-200">
                  Get Started
                </a>
              </>
            )}
          </div>

          {/* Mobile menu btn */}
          <button 
            className="lg:hidden p-2 rounded-lg text-gray-700 hover:transition-all hover:bg-gray-100 hover:text-gray-900" 
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="" /> : <Menu className="" />}
          </button>
        </div>
      </div>

  );
}

export default Navbar;
