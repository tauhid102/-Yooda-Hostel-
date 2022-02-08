import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const adminCredential = ["admin@admin.com", "abcd1234"];
  const [adminEmail, setAdminEmail] = useState(null);
  const [adminPass, setAdminPass] = useState(null);
  const navigate = useNavigate();

  const handleAdminEmailChange = (e) => {
    setAdminEmail(e.target.value);
  };
  const handleAdminPassChange = (e) => {
    setAdminPass(e.target.value);
  };
  const adminLogin = () => {
    if (adminEmail === adminCredential[0] && adminPass === adminCredential[1]) {
      localStorage.setItem("adminLoggedIn", true);
      navigate("/addStudent");
    } else {
      window.alert("Please use correct email or pass");
    }
  };
  const adminLogOut = () => {
    localStorage.removeItem("adminLoggedIn");
    navigate("/login");
  };

  return {
    handleAdminEmailChange,
    handleAdminPassChange,
    adminLogin,
    adminLogOut,
    adminEmail
  };
};

export default useAuth;
