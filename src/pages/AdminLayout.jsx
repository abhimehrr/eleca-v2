import { Outlet, useLocation, Navigate } from "react-router-dom";

// Importing Components
import AdminHeader from "../components/AdminHeader";
import Footer from "../components/Footer";
import BackToTop from "../components/partials/BackToTop";
import { useFetch, useFetchToken } from "../utils/fetch";
import { useEffect, useState } from "react";

const AdminLayout = () => {
  const { token } = useFetchToken();
  const location = useLocation();

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  // Verify Login
  useEffect(() => {
    (async () => {
      const data = await useFetch("verify-login", {
        method: "POST",
        authtoken: token,
      });
      setIsLoggedIn(data.isLoggedIn);
    })();
  }, [location]);

  return !isLoggedIn ? (
    <Navigate to="/login" state={{ from: location }} replace={true} />
  ) : (
    <div className="bg-gray-800 py-4">
      <div className="w-full mx-auto sm:w-11/12 md:w-10/12 lg:w-9/12">
        <AdminHeader />
        <main className="my-4 min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
};

export default AdminLayout;
