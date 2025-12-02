import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function ProtectedAdminRoute({ children }) {
  const userType = useSelector((state) => state.auth.userType);

  if (userType !== "ADMIN") {
    return <Navigate to="/unauthorized" />;
  }
  return children;
}
