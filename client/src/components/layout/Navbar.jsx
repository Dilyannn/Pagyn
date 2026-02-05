import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import ProfileDropdown from "./ProfileDropdown.jsx";

import { Menu, X, BookOpen, LogOut } from "lucide-react";

function Navbar({ showLinks = true }) {
  const { user, logout, isAuthenticated } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Features", href: "#features" },
    { name: "Testimonials", href: "#testimonials" },
  ];

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${
      showLinks 
        ? isScrolled 
          ? "bg-white/80 backdrop-blur-lg border-b border-gray-100/50 shadow-sm"
          : "bg-white border-b border-gray-100" 
        : "bg-white/5 backdrop-blur-md"
    }`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 bg-linear-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-all duration-300">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 tracking-tight">
              Pagyn
            </span>
          </Link>

          {showLinks && (
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
          )}

          <div className="hidden lg:flex items-center space-x-3">
            {/*Auth btn & pf */}
            {isAuthenticated ? (
              <ProfileDropdown
                username={user?.username || "User"}
                onLogout={logout}
              />
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 rounded-lg hover:bg-gray-50 transition-all duration-200">
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="px-5 py-2 text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-xl shadow-lg shadow-violet-500/20 hover:shadow-violet-600/30 transition-all duration-200">
                  Get Started
                </Link>
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

      {/* Mobile menu */}      
      {showLinks && isOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 animate-in slide-in-from-top duration-400">
          <nav className="px-4 pt-4 space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block px-4 py-2 text-2sm font-medium text-gray-700 hover:text-violet-600 rounded-lg hover:bg-violet-50/50 transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>
            
          <div className="px-4 pt-4 border-t border-gray-100">
            {isAuthenticated ? (
              <div className="space-y-4 pb-4 px-2">
                <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-xl">
                  <div className="h-10 w-10 bg-linear-to-br from-violet-400 to-violet-500 rounded-lg flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-lg">
                      {user?.username?.charAt(0).toUpperCase() || "U"}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-bold text-gray-900 truncate">
                      {user?.username || "User"}
                    </div>
                    <div className="text-xs text-gray-500 truncate">
                      {user?.email}
                    </div>
                  </div>
                </div>
                
                <button
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2.5 text-sm font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-all duration-200"
                  onClick={() => logout()}
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign out</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3 pb-4">
                <Link
                  to="/login"
                  className="block w-full text-center px-4 py-2.5 text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200"
                >
                  Log In
                </Link>

                <Link
                  to="/register"
                  className="block w-full text-center px-4 py-2.5 text-sm font-bold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-lg shadow-violet-500/20 transition-all duration-200"
                >
                  Get Started
                </Link>
              </div>
            )}
          </div>
        </div>
      )}      
    </header>
  );
}

export default Navbar;
