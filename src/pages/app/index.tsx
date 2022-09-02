import AuthContext from "contexts/AuthContext";
import AppLayout from "layouts/AppLayout";
import { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Bookings from "./bookings";
import AppHome from "./home";
import Services from "./services";
import Settings from "./settings";

const AppIndex = () => {
  const { loggedIn, loading } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn && !loading) {
      navigate("/login");
    }
  }, [loggedIn, navigate, loading]);

  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<AppHome />} />
        <Route path="/bookings" element={<Bookings />} />
        <Route path="/services" element={<Services />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </AppLayout>
  );
};

export default AppIndex;
