import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import ProfileDropdown from "./ProfileDropdown";
import { BookOpen } from "lucide-react";

const DashboardMainLayout = ({ children }) => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute -top-[10%] -left-[10%] w-125 h-125 bg-violet-200 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute top-[10%] -right-[5%] w-100 h-100 bg-purple-200 rounded-full blur-[100px] opacity-25"></div>
        <div className="absolute bottom-[10%] -left-[5%] w-100 h-100 bg-indigo-100 rounded-full blur-[100px] opacity-30"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-125 h-125 bg-violet-200 rounded-full blur-[120px] opacity-30"></div>
      </div>

      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100/50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center space-x-2.5 group">
            <div className="w-9 h-9 bg-linear-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/20 group-hover:scale-105 transition-all duration-300">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-linear-to-r from-gray-900 to-gray-600 tracking-tight">
              Pagyn - an AI eBook Creator
            </span>
          </Link>

          <div className="flex items-center space-x-4">
            <ProfileDropdown
              username={user?.username || "User"}
              onLogout={logout}
            />
          </div>
        </div>
      </header>

      <main className="relative z-10 max-w-7xl mx-auto p-6 lg:p-10 min-h-[calc(100vh-64px)]">
        {children}
      </main>
    </div>
  )
}

export default DashboardMainLayout