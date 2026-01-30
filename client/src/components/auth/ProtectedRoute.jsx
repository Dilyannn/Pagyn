import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = false;
  const isLoading = false;
  const location = useLocation();

  if (isLoading) {
    //~ Loading state here
    return <div>Loading...</div>;
  }
  
  if (!isAuthenticated) {
    return (
      <Navigate to="/login" state={{ from: location }} replace />
    );
  }



  return children;
}

export default ProtectedRoute;