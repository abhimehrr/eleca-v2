import { Outlet } from "react-router-dom";

// Importing Components
import Header from "../components/Header";
import Footer from "../components/Footer";
import BackToTop from "../components/partials/BackToTop";

const HomeLayout = () => {
  return (
    <div className="bg-gray-800 py-4">
      <div className="w-full mx-auto sm:w-11/12 md:w-10/12 lg:w-9/12">
        <Header />
        <main className="my-4 min-h-screen">
          <Outlet />
        </main>
        <Footer />
      </div>
      <BackToTop />
    </div>
  );
};

export default HomeLayout;
