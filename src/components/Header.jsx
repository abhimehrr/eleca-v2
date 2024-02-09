import React, { useState } from "react";
import { Link } from "react-router-dom";

const navLinks = {
  home: {
    path: '/',
    name: 'Home',
    icon: 'fa-solid fa-home',
    isDivider: false
  },
  pay: {
    path: '/pay',
    name: 'Pay',
    icon: 'fa-solid fa-indian-rupee-sign',
    isDivider: false
  },
  warrantyInfo: {
    path: '/warranty-card',
    name: 'Warranty Info',
    icon: 'fa-solid fa-circle-info',
    isDivider: false
  },
  login: {
    path: '/login',
    name: 'Login',
    icon: 'fa-solid fa-arrow-right',
    isDivider: false
  }
}

export default function AdminHeader() {
  const [showMenu, setShowMenu] = useState(false);

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
              to="/"
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

                <div className="relative min-h-screen px-6 py-4 flex flex-col gap-4 bg-slate-900 rounded-r-xl">
                  <div className="mb-4 text-3xl font-bold text-gray-300 hover:text-teal-500 cursor-pointer">
                    eleca
                  </div>
                  {Object.keys(navLinks).map(key => (
                    <React.Fragment key={key}>
                      <Link
                        to={navLinks[key].path}
                        onClick={()=>setShowMenu(false)}
                        className="inline-flex gap-3 my-1 font-medium items-center text-gray-300 border-0 focus:outline-none hover:text-teal-500 transition-all"
                      >
                        <i className={`${navLinks[key].icon} text-teal-500`}></i>
                        {navLinks[key].name}
                      </Link>
                      {navLinks[key].isDivider && <div className="divider !bg-slate-800 !h-0.5" />}
                    </React.Fragment>
                  ))}
                </div>
              </nav>
          </div>

          <nav className="flex gap-3">
            <Link
              to={navLinks.pay.path}
              className="hidden min-[425px]:inline-flex gap-3 text-sm font-medium items-center bg-gray-900 text-gray-300 border-0 py-2 px-4 focus:outline-none group hover:bg-gray-950 transition-all hover:text-teal-500 rounded"
            >
              {navLinks.pay.name}
              <i className={`${navLinks.pay.icon} text-teal-500`}></i>
            </Link>
            <Link
              to={navLinks.warrantyInfo.path}
              className="hidden sm:inline-flex gap-3 text-sm font-medium items-center bg-gray-900 text-gray-300 border-0 py-2 px-4 focus:outline-none group hover:bg-gray-950 transition-all hover:text-teal-500 rounded"
            >
              {navLinks.warrantyInfo.name}
              <i className={`${navLinks.warrantyInfo.icon} text-teal-500`}></i>
            </Link>
            <Link
              to={navLinks.login.path}
              className="inline-flex group gap-3 text-sm font-medium items-center bg-gray-900 text-gray-300 border-0 py-2 px-4 focus:outline-none group hover:bg-gray-950 transition-all hover:text-teal-500 rounded"
            >
              {navLinks.login.name}
              <i className={`${navLinks.login.icon} text-teal-500 group-hover:translate-x-1 transition-all`}></i>
            </Link>
          </nav>
        </div>
      </header>
    </React.Fragment>
  )
}
