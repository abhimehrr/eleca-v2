import React, { useEffect, useState } from "react";
import { Loader } from "../../components/partials/loader/Loader";
import WarrantyViewCard from "../../components/partials/admin/WarrantyViewCard";
import { setWarrantyCards } from "../../store/slices/admin";
import { useDispatch, useSelector } from "react-redux";
import { useFetch } from "../../utils/fetch";
import Pagination from "../../components/partials/Pagination";
import SearchScreen from "../../components/essentials/SearchScreen";
import { WarrantyCardSearchManager } from "../../components/essentials/SearchManager";
import { useSearchParams } from "react-router-dom";

// Data
const sortingOption = ["Latest", "Oldest"];

export default function WarrantyCards() {
  const { token, warrantyCards } = useSelector((s) => s.admin);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Loader
  const [loader, setLoader] = useState(true);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);

  // Page
  const resultPerPage = 5;
  const page = parseInt(searchParams.get("page")) || 1;
  const [pageNumber, setPageNumber] = useState(1);

  const [tempCards, setTempCards] = useState([]);

  // Fetch Services
  const fetchWarrantyCards = async () => {
    setLoader(true);

    const data = await useFetch("admin/fetch-all-warranty-cards", {
      method: "POST",
      authtoken: token,
    });

    var s = [];
    for (var i = data.data.length - 1; i >= 0; i--) {
      s.push(data.data[i]);
    }

    var pagen = Math.max(page, 1);

    if (Math.ceil(s.length / resultPerPage) >= pagen) {
      setTempCards(s.slice(resultPerPage * (pagen - 1), resultPerPage * pagen));
      setPageNumber(pagen);
    } else {
      var min = Math.min(Math.ceil(s.length / resultPerPage), pagen);
      setTempCards(s.slice(resultPerPage * (min - 1), resultPerPage * min));
      setPageNumber(min);
    }

    dispatch(setWarrantyCards(s));
    setLoader(false);
  };

  // Handle Filter
  const handleSorting = (e) => {
    var temp = [];
    for (let i = warrantyCards?.length - 1; i >= 0; i--) {
      temp.push(warrantyCards[i]);
    }
    dispatch(setWarrantyCards(temp));
  };

  // Pagination
  useEffect(() => {
    var skip = resultPerPage * (pageNumber - 1);
    var temp = [];
    var ts = warrantyCards;
    for (let i = skip; i < pageNumber * resultPerPage; i++) {
      if (ts[i] === undefined) {
        break;
      }
      temp.push(ts[i]);
    }
    setSearchParams("page=" + pageNumber);
    setTempCards(temp);
  }, [pageNumber, warrantyCards]);

  useEffect(() => {
    (async function () {
      if (warrantyCards.length < 1) {
        await fetchWarrantyCards();
      } else {
        setLoader(false);
      }
    })();

    document.title = "Warranty Cards | Admin";
  }, []);

  return loader ? (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Loader />
    </div>
  ) : (
    <React.Fragment>
      <div className="py-8 sm:px-4 px-3 max-sm:mx-2 bg-gray-900 rounded-lg text-gray-200">
        <section className="text-gray-400 bg-gray-900 body-font">
          <div className="mx-autoflex flex-col justify-center items-center">
            <div className="flex flex-col items-center text-center">
              <h1 className="title-font sm:text-3xl text-3xl tracking-wider mb-4 font-bold text-teal-500">
                Warranty Dashobard
              </h1>
            </div>
            {/* Service Card */}
            <div className="w-full">
              <div className="px-2 sm:px-10 mt-6 mx-auto">
                <div className="flex items-center gap-4 mb-4">
                  <h2 className="sm:text-2xl text-xl font-semibold title-font text-slate-100">
                    All Cards
                  </h2>
                  <button
                    onClick={fetchWarrantyCards}
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
                      onChange={handleSorting}
                      className="bg-transparent border outline-none px-2 py-0.5 rounded border-gray-200 cursor-pointer"
                    >
                      {sortingOption?.map((opt) => (
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
                    className="w-1/2 flex items-center gap-3 text-lg text-slate-200 bg-slate-800 hover:bg-slate-700 px-6 py-1.5 cursor-text rounded-full transition-all"
                  >
                    <i className="fa-solid fa-search"></i>
                    <span className="h-6 w-0.5 bg-teal-600"></span>
                    <span className="text-slate-400 mr-6">Search</span>
                  </button>
                </div>

                <div className="w-full flex flex-col gap-3 pb-2 text-slate-300">
                  {tempCards?.length < 1 ? (
                    <div className="relative min-h-14">
                      <div className="text-lg font-medium py-4 text-red-400">
                        No result to show
                      </div>
                    </div>
                  ) : (
                    tempCards?.map((d) => (
                      <WarrantyViewCard key={d.ID} values={d} />
                    ))
                  )}
                </div>

                {/* Pagination */}
                {warrantyCards?.length > resultPerPage &&
                  tempCards?.length > 0 && (
                    <div className="mt-4">
                      <Pagination
                        data={warrantyCards}
                        resultPerPage={resultPerPage}
                        pageNumber={pageNumber}
                        setPageNumber={setPageNumber}
                      />
                    </div>
                  )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Search Warranty Cards */}
      {showSearch && (
        <SearchScreen
          title={"Search warranty cards"}
          closeSearch={setShowSearch}
          placeholder={"Serial number, name, or mobile"}
          search={search}
          setSearch={setSearch}
        >
          <WarrantyCardSearchManager
            searchQuery={search}
            data={warrantyCards}
          />
        </SearchScreen>
      )}
    </React.Fragment>
  );
}
