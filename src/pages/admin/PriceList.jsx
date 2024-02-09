import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { useFetch } from "../../utils/fetch";
import { setPriceList } from "../../store/slices/admin";

// Components
import { Loader } from "../../components/partials/loader/Loader";
import PriceTableRow from "../../components/partials/admin/price-table-row/PriceTableRow";
import Pagination from "../../components/partials/Pagination";
import SearchScreen from "../../components/essentials/SearchScreen";
import { PriceListSearchManager } from "../../components/essentials/SearchManager";

// Data
const sortingOption = ["Latest", "Oldest"];

export default function PriceList() {
  const { priceList, token } = useSelector((s) => s.admin);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Loader
  const [loader, setLoader] = useState(true);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState("");

  // Price List
  const [tempPriceList, setTempPriceList] = useState([]);

  // Page
  const resultPerPage = 20;
  const page = parseInt(searchParams.get("page")) || 1;
  const [pageNumber, setPageNumber] = useState(1);

  // Handle Filter
  const handleSorting = (e) => {
    // var f = e.target.value;

    // For now
    var temp = [];
    for (let i = priceList?.length - 1; i >= 0; i--) {
      temp.push(priceList[i]);
    }
    dispatch(setPriceList(temp));

    /*
    if (f === "latest") {
      var temp = [];
      for (let i = priceList?.length - 1; i >= 0; i--) {
        temp.push(priceList[i]);
      }
      dispatch(setPriceList(temp));
    } else if (f === "oldest") {
      var temp = [];
      for (let i = priceList?.length - 1; i >= 0; i--) {
        temp.push(priceList[i]);
      }
      dispatch(setPriceList(temp));
    }
    */
  };

  // Fetch Price List
  const fetchPriceList = async () => {
    setLoader(true);

    const data = await useFetch("admin/fetch-price-list", {
      method: "POST",
      authtoken: token,
    });
    var s = [];
    for (var i = data?.data?.length - 1; i >= 0; i--) {
      s.push(data.data[i]);
    }

    var pagen = Math.max(page, 1);

    if (Math.ceil(s.length / resultPerPage) >= pagen) {
      setTempPriceList(
        s.slice(resultPerPage * (pagen - 1), resultPerPage * pagen)
      );
      setPageNumber(pagen);
    } else {
      var min = Math.min(Math.ceil(s.length / resultPerPage), pagen);
      setTempPriceList(s.slice(resultPerPage * (min - 1), resultPerPage * min));
      setPageNumber(min);
    }

    dispatch(setPriceList(s));
    setLoader(false);
  };

  useEffect(() => {
    (async function () {
      if (priceList.length < 1) {
        await fetchPriceList();
      } else {
        setLoader(false);
      }
    })();

    document.title = "Price List | Admin";
  }, []);

  useEffect(() => {
    var skip = resultPerPage * (pageNumber - 1);
    var temp = [];
    var ts = priceList;
    for (let i = skip; i < pageNumber * resultPerPage; i++) {
      if (ts[i] === undefined) {
        break;
      }
      temp.push(ts[i]);
    }

    setSearchParams("page=" + pageNumber);
    setTempPriceList(temp);
  }, [pageNumber, priceList]);

  return loader ? (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <Loader />
    </div>
  ) : (
    <div className="relative py-8 px-4 sm:px-6 max-sm:mx-2 bg-gray-900 rounded-lg text-gray-200">
      <section className="text-gray-400 bg-gray-900 body-font">
        <div className="mx-auto flex flex-col justify-center items-center">
          <div className="flex flex-col items-center">
            <h1 className="title-font sm:text-3xl text-3xl tracking-wider mb-4 font-bold text-teal-500">
              Price List
            </h1>
          </div>
          <div className="w-full mt-4 relative">
            <div className="flex items-center justify-between gap-6 mb-4">
              <div className="flex items-center gap-4">
                <h2 className="sm:text-2xl text-xl font-semibold title-font text-slate-100">
                  Products
                </h2>
                <button
                  onClick={fetchPriceList}
                  title="Refresh Page"
                  className="px-2 py-1 bg-gray-800 hover:bg-yellow-500 hover:text-gray-800 text-gray-200 transition-all rounded"
                >
                  <i className="fa-solid fa-arrows-rotate"></i>
                </button>
              </div>
            </div>
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
                      value={opt?.toLowerCase().split(" ").join("-")}
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

            {/* Price List Table */}
            <div className="text-center">
              <div className="flex flex-col gap-2 mt-8s">
                <div className="grid grid-cols-5 font-semibold text-lg tracking-wider bg-slate-700 text-slate-200 py-2 rounded">
                  <div>Id</div>
                  <div>Product Id</div>
                  <div>RLP</div>
                  <div>MRP</div>
                  <div>Actions</div>
                </div>

                {tempPriceList.map((pl) => (
                  <PriceTableRow key={pl.ID} values={pl} />
                ))}
              </div>
            </div>

            {/* Pagination */}
            {priceList?.length > resultPerPage && tempPriceList?.length > 0 && (
              <div className="mt-4">
                <Pagination
                  data={priceList}
                  resultPerPage={resultPerPage}
                  pageNumber={pageNumber}
                  setPageNumber={setPageNumber}
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Search Screen */}
      {showSearch && (
        <SearchScreen
          title={"Search products"}
          closeSearch={setShowSearch}
          placeholder={"Item name, Id or Product Id"}
          search={search}
          setSearch={setSearch}
        >
          <PriceListSearchManager searchQuery={search} data={priceList} />
        </SearchScreen>
      )}
    </div>
  );
}
