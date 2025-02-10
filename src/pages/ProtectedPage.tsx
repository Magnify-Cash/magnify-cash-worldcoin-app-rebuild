
import { Navigate, useLocation } from "react-router";

const ProtectedRoute = ({ children }) => {
  const isAuthorized = localStorage.getItem("ls_wallet_address");
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  
  // For now, we'll use a simple admin check. In a real app, you'd want to check the user's role in Supabase
  // TODO: Implement proper admin role checking with Supabase
  const isAdmin = isAuthorized; // Temporarily allow all authenticated users to access admin routes

  if (!isAuthorized) {
    return <Navigate to="/" replace />;
  }

  if (isAdminRoute && !isAdmin) {
    return <Navigate to="/announcements" replace />;
  }

  return children;
};

export default ProtectedRoute;
