import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


const navLinks = {
  dashboard: {
    path: '/admin/dashboard',
    name: 'Dashboard',
    icon: 'fa-solid fa-chart-line',
    isDivider: false
  },
  newService: {
    path: '/admin/new-service-request',
    name: 'New Service',
    icon: 'fa-solid fa-plus',
    isDivider: true
  },
  priceList: {
    path: '/admin/price-list',
    name: 'Price List',
    icon: 'fa-solid fa-tag',
    isDivider: false
  },
  addProduct: {
    path: '/admin/add-a-product',
    name: 'Add Product',
    icon: 'fa-solid fa-plus',
    isDivider: true
  },
  warrantyCard: {
    path: '/admin/all-warranty-cards',
    name: 'Warranty Cards',
    icon: 'fa-regular fa-address-card',
    isDivider: false
  },
  // warrantyInfo: {
  //   path: '/admin/warranty-info',
  //   name: 'Warranty Info',
  //   icon: 'fa-solid fa-circle-info',
  //   isDivider: false
  // },
  registerWarranty: {
    path: '/admin/register-a-warranty',
    name: 'Register Warranty',
    icon: 'fa-solid fa-plus',
    isDivider: true
  }
}

export default function AdminHeader() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();

  // Logout
  const logout = () => {
    localStorage.removeItem("auth");
    navigate("/", { replace: true });
  };

  return (
    <React.Fragment>
      <header className="text-gray-400 body-font py-2 max-sm:mx-4">
        <div className="container relative mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div
              onClick={() => setShowMenu(true)}
              className="text-gray-300 hover:text-teal-500 cursor-pointer transition-all"
            >
              <i className="fa-solid fa-bars-staggered text-xl"></i>
            </div>
            <Link
              to="/admin/dashboard"
              className="title-font font-bold text-teal-400 hover:text-teal-500 transition-all md:mb-0"
            >
              <span className="text-3xl">eleca .</span>
            </Link>
          </div>

          <div
            className={`fixed ${
              showMenu ? "top-0 left-0" : "-left-[150%] top-0"
            } w-96 z-20 transition-all duration-300`}
          >
              <nav>
                <div className="absolute top-0 left-0 w-full h-full bg-gray-700 blur-md rounded-r-xl" />
                <div
                  onClick={() => setShowMenu(false)}
                  className="absolute right-4 top-4 z-10 grid place-items-center px-2 py-0.5 border border-red-700 cursor-pointer rounded transition-all"
                >
                  <i className="fa-solid fa-xmark text-xl text-red-600"></i>
                </div>

                <div className="relative overflow-y-scroll h-screen px-6 py-4 flex flex-col gap-4 bg-slate-900 rounded-r-xl">
                  <div className="mb-4 text-3xl font-bold text-gray-300 hover:text-teal-500 cursor-pointer">
                    eleca
                  </div>
                  <div className="flex flex-col gap-y-2">
                    {Object.keys(navLinks).map(key => (
                      <React.Fragment key={key}>
                        <Link
                          to={navLinks[key].path}
                          onClick={() => setShowMenu(false)}
                          className="inline-flex gap-3 my-1 font-medium items-center text-gray-300 border-0 focus:outline-none hover:text-teal-500 transition-all"
                        >
                          <i className={`${navLinks[key].icon} text-teal-500`}></i>
                          {navLinks[key].name}
                        </Link>
                        {navLinks[key].isDivider && <div className="w-full h-[1px] my-2 bg-slate-700" />}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </nav>
          </div>

          <nav className="flex gap-3">
            <Link
              to={navLinks.newService.path}
              className="hidden sm:inline-flex gap-3 text-sm font-medium items-center bg-gray-900 text-gray-300 border-0 py-2 px-4 focus:outline-none group hover:bg-gray-950 transition-all hover:text-teal-500 rounded"
            >
              {navLinks.newService.name}
              <i className={`${navLinks.newService.icon} text-teal-500`}></i>
            </Link>
            <Link
              to={navLinks.priceList.path}
              className="hidden min-[425px]:inline-flex gap-3 text-sm font-medium items-center bg-gray-900 text-gray-300 border-0 py-2 px-4 focus:outline-none group hover:bg-gray-950 transition-all hover:text-teal-500 rounded"
            >
              {navLinks.priceList.name}
              <i className={`${navLinks.priceList.icon} text-teal-500`}></i>
            </Link>
            <Link
              to={navLinks.warrantyCard.path}
              className="hidden lg:inline-flex gap-3 text-sm font-medium items-center bg-gray-900 text-gray-300 border-0 py-2 px-4 focus:outline-none group hover:bg-gray-950 transition-all hover:text-teal-500 rounded"
            >
              {navLinks.warrantyCard.name}
              <i className={`${navLinks.warrantyCard.icon} text-teal-500`}></i>
            </Link>
            <button
              onClick={logout}
              className="inline-flex gap-3 text-sm font-medium items-center bg-gray-900 text-gray-300 border-0 py-2 px-4 focus:outline-none group hover:bg-gray-950 transition-all hover:text-red-500 rounded"
            >
              Logout
              <i className="fa-solid fa-power-off text-red-500 group-hover:scale-125 transition-all"></i>
            </button>
          </nav>
        </div>
      </header>
      {/* <div className="divider mt-4"></div> */}
    </React.Fragment>
  );
}
