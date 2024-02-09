import React, { useRef, useState, useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useFetch, useFetchToken } from "../../utils/fetch";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slices/admin";

// Loader
import { LoaderLineDot } from "../../components/partials/loader/Loader";
import { Toast } from "../../components/partials/toast/Dialog";

export default function AdminLogin() {
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(true);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  // Loader
  const [loader, setLoader] = useState(false);
  const [toast, setToast] = useState(false);
  const [resetPassLoader, setResetPassLoader] = useState(false);

  // Location
  const location = useLocation();
  const navigate = useNavigate();
  const from = location?.state?.from?.pathname || "/admin/dashboard";

  // Input
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const inputRef = useRef(null);
  const passwordRef = useRef(null);

  const [resetInput, setResetInput] = useState("");
  const [pin, setPin] = useState("");
  const [resetPasswordInput, setResetPasswordInput] = useState("");
  const resetInputRef = useRef(null);
  const resetPasswordInputRef = useRef(null);
  const pinRef = useRef(null);

  const [err, setErr] = useState("");

  // Login
  const login = async () => {
    if (username.length < 1) {
      inputRef.current.classList.add("border-red-500");
      return setErr("Please enter email or mobile");
    } else {
      inputRef.current.classList.remove("border-red-500");
      setErr("");
    }

    if (password.length < 1) {
      passwordRef.current.classList.add("border-red-500");
      return setErr("Please enter password");
    } else {
      passwordRef.current.classList.remove("border-red-500");
      setErr("");
    }

    setLoader(true);

    var data = await useFetch("login", {
      method: "POST",
      body: {
        username,
        password,
      },
    });

    if (data.access === "allowed") {
      localStorage.setItem(
        "auth",
        JSON.stringify({
          exp: Date.now() + 1000 * 60 * 60 * 24,
          token: data.authToken,
        })
      );
      dispatch(setToken(data.authToken));
      navigate(from, { state: location, replace: true });
    } else {
      console.log(data);
      setLoader(false);
      setErr(data.msg);
    }
  };

  // Reset Password
  const resetPassword = async () => {
    setResetPassLoader(true);
    var data = await useFetch("reset-password", {
      method: "POST",
      body: {
        username: resetInput,
        password: resetPasswordInput,
        pin,
      },
    });
    if (!data.data) {
      setErr(data.msg);
      setResetPassLoader(false);
    }
    if (data.data) {
      setToast({
        title: "Success",
        msg: "Password changed successfully.",
      });
      setTimeout(() => {
        setToast(false);
      }, 3000);
      setResetPassLoader(false);
      setErr("");
      setShowLogin(true);
      setShowForgotPassword(false);
    }
  };

  // Handle Login
  const handleLogin = (e) => {
    e.preventDefault();
    login();
  };

  // Handle Reset Password
  const handleResetPassword = (e) => {
    e.preventDefault();
    resetPassword();
  };

  // Verify Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const { token } = useFetchToken();

    if (token) {
      (async () => {
        const data = await useFetch("verify-login", {
          method: "POST",
          authtoken: token,
        });
        setIsLoggedIn(data.isLoggedIn);
      })();
    }
  }, []);

  return isLoggedIn ? (
    <Navigate to={"/admin/dashboard"} replace={true} />
  ) : (
    <div className="w-full sm:bg-gray-900 sm:py-10 flex justify-center items-center mt-10 rounded-lg">
      {toast && <Toast title={toast.title} children={toast.msg} />}
      {showLogin && (
        <section className="text-gray-400 max-sm:bg-gray-900 max-sm:w-full max-sm:mx-2 w-[500px] pt-1 pb-6 rounded-lg">
          <div className="container py-6 max-sm:px-4 mx-auto flex flex-wrap items-center">
            <div className="w-full">
              <h2 className="font-semibold text-2xl text-gray-300 text-center">
                Admin Login
              </h2>
            </div>
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-5">
              <form onSubmit={handleLogin}>
                <div className="relative mb-4">
                  <label
                    htmlFor="username"
                    className="leading-7 text-sm text-gray-400"
                  >
                    Email / Mobile
                  </label>
                  <input
                    ref={inputRef}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    autoFocus={true}
                    type="text"
                    id="username"
                    className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-teal-900 rounded border border-gray-600 focus:border-teal-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>
                <div className="relative mb-4">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="leading-7 text-sm text-gray-400"
                    >
                      Password
                    </label>
                    <span
                      onClick={() => {
                        setShowLogin(false);
                        setShowForgotPassword(true);
                        setErr("");
                      }}
                      className="text-sm text-teal-600 hover:text-gray-200 transition-all"
                    >
                      Forgot Password?
                    </span>
                  </div>
                  <input
                    ref={passwordRef}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    type="password"
                    id="password"
                    className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-teal-900 rounded border border-gray-600 focus:border-teal-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <div className="-mt-2 text-sm text-red-400">{err}</div>
                {loader ? (
                  <div className="w-full flex items-center justify-center mt-8">
                    <LoaderLineDot />
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full mt-8 flex gap-2 items-center justify-center text-lg font-medium bg-teal-600 py-2 text-gray-900 hover:bg-teal-500 rounded transition-all"
                  >
                    Login
                    <i className="fa-solid fa-arrow-right text-sm"></i>
                  </button>
                )}
              </form>
            </div>
          </div>
        </section>
      )}

      {showForgotPassword && (
        <section className="text-gray-400 max-sm:mx-2 sm:max-w-[500px] bg-slate-900 pb-4 rounded-lg">
          <div className="container py-6 px-4 mx-auto flex flex-wrap items-center">
            <div className="w-full">
              <h2 className="font-medium text-2xl text-gray-300 text-center">
                Reset Password
              </h2>
            </div>
            <div className="bg-gray-800 bg-opacity-50 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-5">
              <form onSubmit={handleResetPassword}>
                <div className="mb-4 w-full flex items-center justify-between gap-x-3">
                  <div className="relative w-3/5">
                    <label
                      htmlFor="username"
                      className="leading-7 text-sm text-gray-400"
                    >
                      Email / Mobile
                    </label>
                    <input
                      ref={resetInputRef}
                      value={resetInput}
                      onChange={(e) => setResetInput(e.target.value)}
                      type="text"
                      id="username"
                      className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-teal-900 rounded border border-gray-600 focus:border-teal-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                  <div className="relative w-2/6">
                    <label
                      htmlFor="pin"
                      className="leading-7 text-sm text-gray-400"
                    >
                      Reset PIN
                    </label>
                    <input
                      ref={pinRef}
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                      type="password"
                      id="pin"
                      className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-teal-900 rounded border border-gray-600 focus:border-teal-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                    />
                  </div>
                </div>

                <div className="relative mb-4">
                  <label
                    htmlFor="password"
                    className="leading-7 text-sm text-gray-400"
                  >
                    New Password
                  </label>
                  <input
                    ref={resetPasswordInputRef}
                    value={resetPasswordInput}
                    onChange={(e) => setResetPasswordInput(e.target.value)}
                    type="password"
                    id="password"
                    className="w-full bg-gray-600 bg-opacity-20 focus:bg-transparent focus:ring-2 focus:ring-teal-900 rounded border border-gray-600 focus:border-teal-500 text-base outline-none text-gray-100 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                  />
                </div>

                <div className="mb-1 -mt-2 text-sm text-red-400">{err}</div>

                <div className="w-full flex items-center justify-between gap-x-3 mb-4">
                  <div
                    onClick={() => {
                      setShowForgotPassword(false);
                      setShowLogin(true);
                      setErr("");
                    }}
                    className="w-1/2 flex gap-2 items-center justify-center text-white border border-gray-500 py-2 mt-3 focus:outline-none hover:bg-red-600 hover:text-gray-100 transition-all rounded cursor-pointer text-lg"
                  >
                    <i className="fa-solid fa-xmark"></i>
                    Cancel
                  </div>

                  {resetPassLoader ? (
                    <div className="w-1/2 flex items-center justify-center py-3 mt-3 transition-all">
                      <LoaderLineDot />
                    </div>
                  ) : (
                    <button
                      type="submit"
                      className="w-1/2 flex gap-2 items-center justify-center text-gray-800 bg-yellow-500 border-0 py-2 mt-3 focus:outline-none hover:bg-yellow-600 transition-all rounded text-lg"
                    >
                      <i className="fa-solid fa-check"></i>
                      Reset
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
