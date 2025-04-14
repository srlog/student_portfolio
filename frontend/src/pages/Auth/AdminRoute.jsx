// components/AdminRoute.jsx
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  // Example logic: replace this with your own auth logic
  const user = JSON.parse(localStorage.getItem("user")); // or from context
  const isAdmin = user?.role === "admin"; // assume user.role exists
  const isMaster = user?.role === "master"; // assume user.role exists
  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!isAdmin && !isMaster) {
    return <Navigate to="/unauthorized" />;
  }

  return children;
};

export default AdminRoute;
