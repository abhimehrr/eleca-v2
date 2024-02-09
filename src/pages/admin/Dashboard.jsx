import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../utils/fetch";
import { setServices } from "../../store/slices/admin";

// Components
import SearchScreen from "../../components/essentials/SearchScreen";
import { ServiceSearchManager } from "../../components/essentials/SearchManager";
import TableRow from "../../components/partials/admin/service-table-row/TableRow";
import Pagination from "../../components/partials/Pagination";
import Instruction from "../../components/partials/admin/Instruction";

import { Loader } from "../../components/partials/loader/Loader";

// Data
const filterOption = ["All", "Accepted", "Pending", "Cancelled", "Delivered"];

export default function Dashboard() {
  const { services } = useSelector((s) => s.admin);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Loader
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  const navigate = useNavigate();

  // Filter
  const [tempServices, setTempServices] = useState([]);
  const [acceptedStatus, setAcceptedStatus] = useState("");
  const [pendingStatus, setPendingStatus] = useState("");
  const [cancelledStatus, setCancelledStatus] = useState("");
  const [deliveredStatus, setDeliveredStatus] = useState("");

  // Page
  const resultPerPage = 20;
  const page = parseInt(searchParams.get("page")) || 1;
  const [pageNumber, setPageNumber] = useState(1);

  // Handle Filter
  const handleFilter = (e) => {
    var f = e.target.value;

    if (f === "All") {
      setPageNumber(1);
      setTempServices(services.slice(0, resultPerPage));
    } else if (f === "Accepted") {
      setTempServices(acceptedStatus);
    } else if (f === "Pending") {
      setTempServices(pendingStatus);
    } else if (f === "Cancelled") {
      setTempServices(cancelledStatus);
    } else if (f === "Delivered") {
      setTempServices(deliveredStatus);
    }
  };

  // Set Status
  const setStatus = (s) => {
    var filter = s.filter((ser) => ser.currentStatus === "Accepted");
    setAcceptedStatus(filter);

    filter = s.filter((ser) => ser.currentStatus === "Pending");
    setPendingStatus(filter);

    filter = s.filter((ser) => ser.currentStatus === "Cancelled");
    setCancelledStatus(filter);

    filter = s.filter((ser) => ser.currentStatus === "Delivered");
    setDeliveredStatus(filter);
  };

  // Fetch Services
  const fetchServices = async () => {
    setLoader(true);
    const { token } = JSON.parse(localStorage.getItem("auth"));
    const data = await useFetch("admin/fetch-all-services", {
      method: "POST",
      authtoken: token,
    });

    if (data?.access === "denied") {
      navigate("/login", { replace: true });
      return;
    }
    var s = [];
    for (var i = data.data.length - 1; i >= 0; i--) {
      s.push(data.data[i]);
    }

    var pagen = Math.max(page, 1);

    if (Math.ceil(s.length / resultPerPage) >= pagen) {
      setTempServices(
        s.slice(resultPerPage * (pagen - 1), resultPerPage * pagen)
      );
      setPageNumber(pagen);
    } else {
      var min = Math.min(Math.ceil(s.length / resultPerPage), pagen);
      setTempServices(s.slice(resultPerPage * (min - 1), resultPerPage * min));
      setPageNumber(min);
    }

    setStatus(s);
    dispatch(setServices(s));
    setLoader(false);
  };

  useEffect(() => {
    (async function () {
      if (services.length < 1) {
        await fetchServices();
      } else {
        setLoader(false);
      }
    })();

    document.title = "Dashboard | Admin";
  }, []);

  useEffect(() => {
    var skip = resultPerPage * (pageNumber - 1);
    var temp = [];
    var ts = services;
    for (let i = skip; i < pageNumber * resultPerPage; i++) {
      if (ts[i] === undefined) {
        break;
      }
      temp.push(ts[i]);
    }

    setSearchParams("page=" + pageNumber);
    setStatus(services);
    setTempServices(temp);
  }, [pageNumber, services]);

  return loader ? (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Loader />
    </div>
  ) : (
    <React.Fragment>
      {/* Main Start */}
      <div className="py-8 px-2 max-sm:mx-2 bg-gray-900 rounded-lg text-gray-200">
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="mx-auto flex flex-col justify-center items-center">
            <div className="flex flex-col items-center text-center">
              <h1 className="title-font sm:text-3xl text-3xl tracking-wider mb-4 font-bold text-teal-500">
                Dashboard
              </h1>

              {/* Statics */}
              <div className="flex w-full justify-center items-center mt-2">
                <div className="text-slate-300 tracking-wide body-font">
                  <div className="flex justify-between gap-6">
                    <div className="w-1/2">
                      <p className="title-font font-medium text-2xl text-slate-200">
                        {services.length}
                      </p>
                      <p className="leading-relaxed">Total</p>
                    </div>
                    <div className="w-1/2">
                      <p className="title-font font-medium text-2xl text-slate-200">
                        {pendingStatus.length}
                      </p>
                      <p className="leading-relaxed">Pending</p>
                    </div>
                    <div className="w-1/2">
                      <p className="title-font font-medium text-2xl text-slate-200">
                        {cancelledStatus.length}
                      </p>
                      <p className="leading-relaxed">Cancelled</p>
                    </div>
                    <div className="w-1/2">
                      <p className="title-font font-medium text-2xl text-slate-200">
                        {deliveredStatus.length}
                      </p>
                      <p className="leading-relaxed">Delivered</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Service Card */}
              <div className="w-full">
                <div className="px-2 sm:px-10 mt-6 mx-auto">
                  <div className="flex items-center gap-4 mb-4">
                    <h2 className="sm:text-2xl text-xl font-semibold title-font text-slate-100">
                      Service Requests
                    </h2>
                    <button
                      onClick={fetchServices}
                      title="Refresh Page"
                      className="px-2 py-1 bg-gray-800 hover:bg-yellow-500 hover:text-gray-800 text-gray-200 transition-all rounded"
                    >
                      <i className="fa-solid fa-arrows-rotate"></i>
                    </button>
                  </div>

                  {/* Filter */}
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-slate-300">Filter</span>
                      <select
                        onChange={handleFilter}
                        className="bg-transparent border outline-none px-2 py-0.5 rounded border-gray-200 cursor-pointer"
                      >
                        {filterOption?.map((opt) => (
                          <option
                            key={opt}
                            value={opt}
                            className="bg-gray-800 text-gray-300"
                          >
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>
                    <button
                      onClick={() => setShowSearch(true)}
                      className="w-2/5 flex items-center gap-3 text-lg text-slate-200 bg-slate-800 hover:bg-slate-700 px-6 py-1.5 cursor-text rounded-full transition-all"
                    >
                      <i className="fa-solid fa-search"></i>
                      <span className="h-6 w-0.5 bg-teal-600"></span>
                      <span className="text-slate-400 mr-6">Search</span>
                    </button>
                  </div>

                  <div className="flex flex-col pb-2 text-slate-300 shidden">
                    <table>
                      <thead>
                        <tr className="text-gray-100 bg-teal-700 rounded gap-4">
                          <td>Id</td>
                          <td>Customer</td>
                          <td>Item</td>
                          <td>Status</td>
                          <td>Actions</td>
                        </tr>
                      </thead>
                      <tbody>
                        {tempServices?.length < 1 ? (
                          <tr className="relative min-h-14 !border-none">
                            <div className="absolute w-full text-lg font-medium py-4 text-red-400">
                              No result to show
                            </div>
                          </tr>
                        ) : (
                          tempServices?.map((d) => (
                            <TableRow key={d.ID} values={d} />
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>

                  {/* Pagination */}
                  {services?.length > resultPerPage &&
                    tempServices?.length > 0 && (
                      <div className="mt-4">
                        <Pagination
                          data={services}
                          resultPerPage={resultPerPage}
                          pageNumber={pageNumber}
                          setPageNumber={setPageNumber}
                        />
                      </div>
                    )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* Main End */}

      {/* Instructions */}
      <Instruction />

      {/* Search Screen */}
      {showSearch && (
        <SearchScreen
          title={"Search services"}
          closeSearch={setShowSearch}
          placeholder={"Name, Item Name, or Service Id"}
          search={search}
          setSearch={setSearch}
        >
          <ServiceSearchManager searchQuery={search} data={services} />
        </SearchScreen>
      )}
    </React.Fragment>
  );
}
