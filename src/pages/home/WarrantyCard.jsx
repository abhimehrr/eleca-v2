import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { useFetch, host } from "../../utils/fetch";
import { setWarrantyCards } from "../../store/slices/user";

// Components
import { LoaderLineDot } from "../../components/partials/loader/Loader";
import Input from "../../components/essentials/Input";

// Invalid Image
import invalidImg from "../../assets/invalid.jpg";
import Sign from "../../components/partials/Sign";

export default function WarrantyCard() {
  const { warrantyCards } = useSelector((s) => s.user);
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("query") || "";

  const [loader, setLoader] = useState(false);

  // Error
  const [errMsg, setErrMsg] = useState("");

  // Cards
  const [wCard, setWCard] = useState(false);
  const [showInvalidCard, setShowInvalidCard] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);

  // Search
  const [search, setSearch] = useState(searchQuery);
  const searchRef = useRef(null);

  // Check Warranty Card
  const checkWarrantyCard = async (search) => {
    if (search.length < 1) {
      searchRef.current.classList.add("border-red-500");
      setErrMsg("Please enter mobile or serial number");
    } else {
      searchRef.current.classList.remove("border-red-500");
      setErrMsg("");
      setLoader(true);

      // Check Warranty Card
      const data = await useFetch("check-warranty-card", {
        method: "POST",
        body: { search },
      });

      setSearchParams("query=" + search);

      if (data.data.length < 1) {
        setLoader(false);
        setWCard(false);
        dispatch(setWarrantyCards([]));
        setShowInvalidCard(true);
        return;
      }
      var temp = [];
      for (var i = data.data.length - 1; i >= 0; i--) {
        temp.push(data.data[i]);
      }

      setWCard(temp[0]);
      dispatch(setWarrantyCards(temp));
      setCurrentCardIndex(0);
      setLoader(false);
      setShowInvalidCard(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    checkWarrantyCard(search);
  };

  useEffect(() => {
    if (searchQuery && warrantyCards.length < 1) {
      checkWarrantyCard(searchQuery);
      setSearch(searchQuery);
    } else if (warrantyCards.length > 1) {
      setLoader(false);
    }
  }, []);

  useEffect(() => {
    setWCard(warrantyCards[currentCardIndex]);
  }, [currentCardIndex]);

  return (
    <React.Fragment>
      {/* Main */}
      <div className="sm:p-10 px-4 py-6 my-10 max-sm:mx-2 bg-slate-900 rounded-lg text-gray-200">
        <div className="p-8 mx-auto w-full sm: bg-slate-800 rounded-lg">
          <h1 className="title-font sm:text-3xl text-3xl text-center font-medium text-slate-100">
            <span className="text-teal-500 font-bold">Warranty Card</span>
          </h1>

          <div className="mt-10 w-full">
            <div className="my-4 w-full relative">
              <form onSubmit={handleSubmit}>
                <div className="absolute -top-6 text-sm text-red-500">
                  {errMsg}
                </div>

                <div className="mb-2 text-gray-300">
                  Check if warranty card is valid.
                </div>
                <div className="w-full flex gap-4 max-sm:flex-col items-center justify-between">
                  <Input
                    setRef={searchRef}
                    value={search}
                    onChange={setSearch}
                    type="number"
                    id="query"
                    placeholder="Mobile or serial number"
                    clearInput={{
                      show: true,
                      customClass: "top-1.5 right-3 text-gray-400",
                    }}
                  />

                  <div className="w-full md:w-1/3 flex items-center gap-x-3">
                    {loader ? (
                      <div className="w-full flex items-center justify-center py-2 rounded transition-all">
                        <LoaderLineDot />
                      </div>
                    ) : (
                      <button
                        type="submit"
                        className="w-full flex gap-2 items-center justify-center font-medium bg-teal-600 py-2 text-gray-900 hover:bg-teal-500 rounded transition-all"
                      >
                        <i className="fa-solid fa-check-double text-sm"></i>
                        Check Validity
                      </button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        {/* Warranty Card */}
        {wCard && (
          <div className="pb-5">
            <section className="pt-5">
              <div className="flex items-start max-md:flex-col gap-4 md:gap-8 bg-slate-800 p-4 sm:p-8 w-full rounded-lg">
                <div className="w-full md:w-1/2 relative">
                  <div className="absolute w-full h-full blur-sm bg-opacity-75 bg-slate-100"></div>
                  <div className="w-full aspect-square bg-slate-300 relative overflow-hidden rounded-lg">
                    <div
                      className="main-image-box relative h-full w-full transition-all cursor-pointer"
                      style={{
                        "--src":
                          "url(" + host + "static/images/" + wCard?.image + ")",
                      }}
                    >
                      <Sign sign={wCard?.adminName} />
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-1/2">
                  <div className="capitalize text-2xl lg:text-3xl max-md:mt-4 font-bold text-green-400">
                    Genuine & a valid card
                    <div className="w-full h-[1px] my-5 bg-slate-600" />
                  </div>
                  <div className="flex flex-wrap gap-3 capitalize text-lg text-slate-400">
                    <p>{wCard?.cName}</p>
                    <span className="text-teal-600">|</span>
                    <p>{wCard?.cAddress}</p>
                    <span className="text-teal-600">|</span>
                    <p>{wCard?.cMobile}</p>
                  </div>
                  <h2 className="capitalize text-teal-500 text-2xl font-bold my-4">
                    {wCard?.itemName}
                  </h2>
                  <div className="flex flex-col gap-1 capitalize tracking-wide text-slate-400">
                    <p className="flex items-center gap-2 flex-wrap">
                      Serial Number :
                      <span className="text-slate-200">{wCard?.ID}</span>
                    </p>
                    <p className="flex items-center gap-2 flex-wrap">
                      Warranty Period :
                      <span className="text-slate-200">
                        {wCard?.period} month
                      </span>
                    </p>
                    <p className="flex items-center gap-2 flex-wrap">
                      Date of Purchase :
                      <span className="text-slate-200 uppercase">
                        {wCard?.dop?.split(",")[0].trim()}
                        <span className="mx-2 text-teal-500">|</span>

                        {wCard?.dop?.split(",")[1].trim()}
                      </span>
                    </p>
                    {wCard?.comments.length > 1 && (
                      <div className="text-teal-500">
                        Conditions :
                        <ul className="text-slate-400 ml-8">
                          {wCard?.comments.split(",").map((c) => (
                            <li
                              key={c}
                              className="list-disc text-wrap my-2 capitalize"
                            >
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {showInvalidCard && (
          <div className="max-sm:px-4 my-10">
            <div className="w-full mx-auto">
              <div className="min-w-full text-center bg-gray-800 p-10 rounded-lg">
                <div className="text-xl">
                  <span className="text-gray-200">{search}</span>
                  <span className="text-gray-400 ml-2">is not found!</span>
                </div>
                <div className="relative w-[300px] my-5 mx-auto">
                  <div className="absolute w-full aspect-square blur-sm bg-red-500" />
                  <img
                    src={invalidImg}
                    className="w-full relative aspect-square rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {warrantyCards?.length > 1 && (
          <div className="mt-5 flex items-center justify-between">
            <button
              onClick={() =>
                setCurrentCardIndex((i) =>
                  i === 0 ? warrantyCards.length - 1 : i - 1
                )
              }
              className="text-sm p-2 flex items-center justify-center bg-gray-700 hover:bg-red-600 transition-all rounded"
            >
              <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div className="flex items-center justify-center gap-x-2">
              <div className="text-left mb-2">
                [ Showing {currentCardIndex + 1} of {warrantyCards.length}{" "}
                results ]
              </div>
            </div>
            <button
              onClick={() =>
                setCurrentCardIndex((i) =>
                  i < warrantyCards.length - 1 ? i + 1 : 0
                )
              }
              className="text-sm p-2 flex items-center justify-center cursor-pointer bg-gray-700 hover:bg-teal-600 transition-all rounded"
            >
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}
