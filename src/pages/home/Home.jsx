import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { useFetch, host } from "../../utils/fetch";
import { setServices } from "../../store/slices/user";

// Importing Components
import Contact from "../../components/essentials/Contact";
import ServiceCard from "../../components/essentials/ServiceCard";
import { Loader } from "../../components/partials/loader/Loader";
import Input from "../../components/essentials/Input";

export default function Home() {
  const { services } = useSelector((s) => s.user);
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  var searchQuery = searchParams.get("query") || "";

  const [search, setSearch] = useState(searchQuery);
  const [serviceContainer, setServiceContainer] = useState(false);
  const [loader, setLoader] = useState(false);
  const inputRef = useRef(null);

  // Fetch Services
  const fetchServices = async (search) => {
    setLoader(true);

    var data = await useFetch("check-service-request", {
      method: "POST",
      body: { search },
    });

    setSearchParams("query=" + search);

    var s = [];
    for (var i = data.data.length - 1; i >= 0; i--) {
      s.push(data.data[i]);
    }

    setLoader(false);
    dispatch(setServices(s));
    setServiceContainer(true);
  };

  // Handle Submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      fetchServices(search);
    }
  };

  useEffect(() => {
    if (searchQuery && services.length < 1) {
      fetchServices(searchQuery);
    } else if (services.length > 1) {
      setServiceContainer(true);
    }

    document.title = "Eleca | Home";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* Main Start */}
      <div className="p-4 max-sm:mx-2 bg-gray-900 rounded-lg text-gray-200">
        <section className="body-font">
          <div className="container mx-auto flex flex-col p-4 justify-center items-center">
            <div className="flex flex-col mb-5 items-center text-center">
              <h1 className="sm:text-3xl text-3xl mb-4 font-medium text-white">
                Welcome to{" "}
                <span className="text-teal-500">Ashok Electronics</span>
              </h1>

              {/* Serch Box */}
              <div className="my-10 flex flex-col w-full justify-center items-center mt-3">
                <form onSubmit={handleSubmit}>
                  <div className="flex gap-3 items-end">
                    <div className="relative text-left">
                      <label
                        htmlFor="mobile-number"
                        className="text-md sm:text-lg text-gray-400"
                      >
                        Check your service status.
                      </label>
                      <Input
                        setRef={inputRef}
                        value={search}
                        onChange={setSearch}
                        type="number"
                        id="mobile-number"
                        placeholder="Mobile or service id"
                        customClass="mt-2"
                        clearInput={{
                          show: true,
                          customClass: "-top-0.5 right-3 text-gray-400",
                        }}
                      />
                    </div>
                    <button
                      type="submit"
                      className="flex gap-3 items-center justify-center text-white bg-teal-600 hover:bg-teal-700 border-0 py-2 px-6 focus:outline-none transition-all rounded text-lg"
                    >
                      <i className="fa-solid fa-check-double mr-2"></i>
                      Check
                    </button>
                  </div>
                </form>
              </div>

              {/* Service Card */}
              {serviceContainer && (
                <div className="text-gray-400 mb-8 body-font w-full">
                  {loader ? (
                    <div className="flex items-center justify-center flex-col">
                      <Loader />
                    </div>
                  ) : (
                    <div className="container px-2 pt-5 mx-auto">
                      {services?.length < 1 ? (
                        <span className="text-red-400">Result not found!</span>
                      ) : (
                        <React.Fragment>
                          <div className="flex flex-col text-center mb-2">
                            <h2 className="sm:text-3xl text-2xl font-bold mb-4 text-white">
                              Service Request
                              <span className="ml-3">⚙️</span>
                            </h2>
                          </div>
                          <div className="flex gap-4 flex-col">
                            {services?.map((s) => (
                              <ServiceCard key={s.ID} values={s} />
                            ))}
                          </div>
                        </React.Fragment>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* About */}
              <div className="flex flex-col text-gray-300">
                <h2 className="sm:text-3xl text-2xl font-bold my-3 text-white">
                  You Trust Us
                  <span className="ml-3">👍</span>
                </h2>
                <div className="bg-gray-800 my-5 inline-flex p-5 rounded-lg items-center focus:outline-none">
                  <span className="flex items-start flex-col leading-none">
                    <span className="text-sm font-semibold text-gray-200 mb-3">
                      WHY US ?
                    </span>
                    <span className="text-gray-400 text-base text-left">
                      Established over 15 years ago,{" "}
                      <span className="text-teal-600 font-medium">
                        Ashok Electronics
                      </span>{" "}
                      has been a reputable electronics shop offering a diverse
                      range of new electronic and electric items. Our extensive
                      inventory includes cutting-edge electronics products as
                      well as a variety of electric devices. Alongside our
                      retail offerings, we proudly provide top-notch servicing
                      for various items, including fans, televisions, LED TVs,
                      and a wide array of other electronic gadgets. We at{" "}
                      <span className="text-teal-600 font-medium">
                        Ashok Electronics
                      </span>{" "}
                      are committed to delivering quality products and reliable
                      services to cater to your electronic needs.
                    </span>
                  </span>
                </div>

                {/* Contact */}
                <Contact />
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="text-sm text-gray-200">
              Terms and Conditions :
              <Link
                className="text-teal-600 hover:text-teal-500 transition-all ml-2"
                to="/term-and-conditions"
              >
                Click Here
              </Link>
            </div>
          </div>
        </section>
      </div>
      {/* Main End */}
    </>
  );
}
