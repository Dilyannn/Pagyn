import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white relative overflow-hidden">
        <div className="absolute -top-[10%] -left-[10%] w-125 h-125 bg-violet-200 rounded-full blur-[120px] opacity-30"></div>
        <div className="absolute -bottom-[10%] -right-[10%] w-125 h-125 bg-violet-200 rounded-full blur-[120px] opacity-30"></div>
        <div className="w-12 h-12 border-4 border-violet-100 border-t-violet-600 rounded-full animate-spin relative z-10"></div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }

  return children;
}

export default ProtectedRoute;