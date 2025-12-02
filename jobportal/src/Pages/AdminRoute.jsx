export default function AdminRoute({ children }) {
    const type = useSelector((state) => state.auth.userType) || localStorage.getItem("userType");
  
    console.log("Redux userType =", type);
    console.log("LocalStorage userType =", localStorage.getItem("userType"));
  
    if (type !== "ADMIN") {
      console.log("⛔ BLOCKED! User is NOT ADMIN");
      return <Navigate to="/unauthorized" />;
    }
  
    console.log("✅ ALLOWED! ADMIN ACCESS CONFIRMED");
    return children;
  }
  