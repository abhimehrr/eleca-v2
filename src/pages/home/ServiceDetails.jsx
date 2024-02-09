import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFetch, host } from "../../utils/fetch";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentService, doRefresh } from "../../store/slices/user";

// Components
import { Loader } from "../../components/partials/loader/Loader";
import { Toast } from "../../components/partials/toast/Dialog";
import ViewImage from "../../components/partials/ViewImage";
import Input from "../../components/essentials/Input";

// Process
import Accepted from "../../components/process/Accepted";
import Pending from "../../components/process/Pending";
import Processing from "../../components/process/Processing";
import CancelledOrRejected from "../../components/process/CancelledOrRejected";
import Completed from "../../components/process/Completed";
import Delivered from "../../components/process/Delivered";

// Assets
import InvalidImg from '../../assets/Invalid.jpg'

export default function ServiceDetails({
  showProcess = false,
  showProcessBtn = false,
}) {
  const { refresh } = useSelector((s) => s.user);
  const { token } = useSelector((s) => s.admin);
  const dispatch = useDispatch();

  const route = window.location.pathname.split("/")[1];
  const { id } = useParams();

  // Services
  const [serviceDetails, setServiceDetails] = useState([]);
  const [serviceProcess, setServiceProcess] = useState([]);

  // Loader
  const [loader, setLoader] = useState(true);
  const [toast, setToast] = useState(false);
  const [error, setError] = useState(false);

  // Update
  const [advanceAmt, setAdvanceAmt] = useState("");
  const [totalAmt, setTotalAmt] = useState("");
  const advanceAmtRef = useRef(null);
  const totalAmtRef = useRef(null);

  // Update Advance Amount
  const handleUpdateAdvanceAmt = (e) => {
    e.preventDefault();
    if (advanceAmt < 1 || isNaN(parseInt(advanceAmt))) {
      advanceAmtRef.current.classList.add("border-red-500");
      return;
    }
    advanceAmtRef.current.classList.remove("border-red-500");

    // Update Total Amount
    (async () => {
      const data = await useFetch("admin/update-advance-amount", {
        method: "POST",
        authtoken: token,
        body: {
          id,
          advanceAmt: parseInt(advanceAmt),
        },
      });

      if (data.data) {
        setAdvanceAmt("");
        setToast({
          title: "Updated",
          msg: data.msg,
        });
        dispatch(doRefresh(Math.floor(Math.random() * 99999)));
      } else {
        setToast({
          title: "Error!",
          msg: "Some error occured...",
        });
      }
      setTimeout(() => {
        setToast(false);
      }, 5000);
    })();
  };

  // Update Total Amount
  const handleUpdateTotalAmt = (e) => {
    e.preventDefault();

    if (totalAmt < 1 || isNaN(parseInt(totalAmt))) {
      totalAmtRef.current.classList.add("border-red-500");
      return;
    }
    totalAmtRef.current.classList.remove("border-red-500");

    // Update Total Amount
    (async () => {
      const data = await useFetch("admin/update-total-amount", {
        method: "POST",
        authtoken: token,
        body: {
          id,
          totalAmt: parseInt(totalAmt),
        },
      });

      if (data.data) {
        setTotalAmt("");
        setToast({
          title: "Updated",
          msg: data.msg,
        });
        dispatch(doRefresh(Math.floor(Math.random() * 99999)));
      } else {
        setToast({
          title: "Error!",
          msg: "Some error occured...",
        });
      }
      setTimeout(() => {
        setToast(false);
      }, 5000);
    })();
  };

  const scrollDownRef = useRef(null);

  // Scale Image
  const scaleLarge = (e) => {
    e.target.classList.toggle("!w-full");
  };

  useEffect(() => {
    (async function () {
      var data = await useFetch("service-details", {
        method: "POST",
        body: { sid: id },
      });

      if (data.data[0].length < 1) {
        setTimeout(() => {
          window.history.back();
        }, 5000);
        setError(true);
        return;
      }

      if (route === "admin") {
        dispatch(setCurrentService([data.data[0], data.data[1]]));
      }

      setServiceDetails(data.data[0]);
      setServiceProcess(data.data[1]);
      setLoader(false);
    })();

    document.title = "Service Details | Eleca";

    // window.scrollTo({
    //   top: 0,
    //   behavior: "smooth",
    // });
  }, [refresh]);

  return error ? (
    <div className="max-sm:px-2 my-10">
      <div className="w-full mx-auto">
        <div className="min-w-full text-center bg-gray-900 p-10 rounded-lg">
          <div className="text-xl">
            <span className="text-gray-200">{id}</span>
            <span className="text-gray-400 ml-2">is not found!</span>
          </div>
          <div className="relative w-[300px] my-5 mx-auto">
            <div className="absolute w-full aspect-square blur-sm bg-red-500" />
            <img
              src={InvalidImg}
              className="w-full relative aspect-square rounded-lg"
            />
          </div>
          <button
            onClick={() => window.history.back()}
            className="px-5 py-2 font-bold text-base cursor-pointer transition-all text-gray-400 bg-gray-800 hover:bg-gray-700 rounded"
          >
            <i className="fa-solid fa-arrow-left"></i>
            <span className="ml-3">Back</span>
          </button>
        </div>
      </div>
    </div>
  ) : loader ? (
    <div className="w-full h-[150vh] absolute top-0 left-0 bg-slate-800">
      <div className="h-screen w-full flex gap-2 flex-col items-center justify-center">
        <Loader />
        <div className="text-lg text-gray-300">Loading...</div>
      </div>
    </div>
  ) : (
    <div className="max-sm:px-2 pb-5">
      <div className="divider mt-5" />
      {toast && <Toast title={toast.title} children={toast.msg} />}

      <section className="py-5 body-font">
        <div className="flex justify-between mb-2">
          <div className="">
            <h1 className="title-font text-2xl font-medium capitalize text-gray-300">
              {serviceDetails.itemName}
            </h1>
            <div className="flex items-center mb-2 max-[400px]:flex-col max-[400px]:items-start">
              <h2 className="text-gray-400 mt-1">
                Request Id : {serviceDetails.ID}
              </h2>
              <span className="text-teal-500 mx-3 max-[400px]:hidden">|</span>
              <div className="text-gray-400 flex items-center gap-2">
                <div
                  className={`w-3 aspect-square ${
                    serviceDetails.currentStatus === "Processing" ||
                    serviceDetails.currentStatus === "Completed" ||
                    serviceDetails.currentStatus === "Delivered"
                      ? "bg-green-400"
                      : serviceDetails.currentStatus === "Pending"
                      ? "bg-yellow-400"
                      : serviceDetails.currentStatus === "Cencelled" ||
                        serviceDetails.currentStatus === "Rejected"
                      ? "bg-red-400"
                      : "bg-gray-200"
                  } rounded-full`}
                />
                {serviceDetails.currentStatus}
              </div>
            </div>
          </div>
          <div className="flex gap-4 items-start justify-center">
            {route === "admin" && showProcessBtn && (
              <button
                onClick={() => showProcess(true)}
                className="group bg-slate-900 text-slate-200 hover:text-yellow-500 flex gap-2 items-center justify-center px-4 py-2 rounded-md transition-all"
              >
                Process
                <i className="fa-solid fa-pencil group-hover:hidden text-yellow-500"></i>
                <i className="fa-solid fa-edit hidden group-hover:block text-yellow-500"></i>
              </button>
            )}
            <button
              onClick={() =>
                scrollDownRef.current.scrollIntoView({
                  behavior: "smooth",
                  inline: "end",
                })
              }
              className="group bg-slate-900 text-slate-200 flex items-center justify-center px-4 py-3 rounded-md transition-all"
            >
              <i className="fa-solid fa-arrow-down group-hover:translate-y-0.5 group-hover:text-teal-500 transition-all"></i>
            </button>
          </div>
        </div>
        <div className="sm:h-[400px] max-sm:w-full max-sm:aspect-square bg-gray-900 rounded-lg">
          <div
            className="main-image-box relative h-full w-full transition-all cursor-pointer rounded-xl"
            style={{
              "--src":
                "url(" + host + "static/images/" + serviceDetails?.image + ")",
            }}
          >
            {route === "admin" && (
              <ViewImage
                imgUrl={host + "static/images/" + serviceDetails?.image}
              />
            )}
          </div>
        </div>
      </section>

      <section className="bg-gray-900 rounded-lg mb-5 p-10 text-gray-400 body-font">
        <div className="mb-3">
          <h2 className="text-teal-500 font-bold">Customer</h2>
          <div className="ml-4 mt-2">
            <ul>
              <li className="my-1">
                <span>Name : </span>
                <span className="capitalize">{serviceDetails.cName}</span>
              </li>
              <li className="my-1">
                <span>Address : </span>
                <span className="capitalize">{serviceDetails.cAddress}</span>
              </li>
              <li className="my-1">
                <span>Mobile : </span>
                <span>
                  {route === "admin" ? (
                    <Link
                      to={`tel:${serviceDetails?.cMobile}`}
                      className="hover:text-teal-500"
                    >
                      {serviceDetails?.cMobile}
                    </Link>
                  ) : (
                    "********" +
                    serviceDetails?.cMobile?.toString().substring(6, 10)
                  )}
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="mb-3">
          <h2 className="text-teal-500 font-bold">Issues</h2>
          <div className="ml-4 mt-2">
            <ul className="ml-4">
              {serviceDetails?.issues?.split(",").map(
                (i) =>
                  i.length > 0 && (
                    <li key={i} className="my-1 list-disc capitalize">
                      {i.trim()?.split("-")?.join(" ")}
                    </li>
                  )
              )}
            </ul>
          </div>
        </div>
        <div className="">
          <h2 className="text-teal-500 font-bold">Payment</h2>
          <div className="ml-4 mt-2">
            <ul className="ml-4">
              <li className="my-1 list-disc text-gray-500">
                <span>Estimate Amount : </span>
                <span>{serviceDetails.estAmt}</span>
              </li>
              <li className="my-2 list-disc font-medium">
                <span>Advance Amount : </span>
                <span className="text-teal-500">
                  {serviceDetails.advanceAmt}
                </span>
                {route === "admin" && (
                  <form onSubmit={handleUpdateAdvanceAmt} className="inline">
                    <span className="inline-flex items-center ml-4 gap-4">
                      <Input
                        value={advanceAmt}
                        onChange={setAdvanceAmt}
                        setRef={advanceAmtRef}
                        type="number"
                        placeholder="Amount"
                        customClass="!w-20 !py-1 placeholder:text-slate-500"
                        clearInput={{
                          show: false,
                        }}
                      />
                      <button
                        type="submit"
                        className="px-4 py-1 text-slate-300 hover:text-slate-900 bg-slate-700 hover:bg-yellow-500 rounded transition-all"
                      >
                        Update
                      </button>
                    </span>
                  </form>
                )}
              </li>
              <li className="my-2 list-disc font-medium">
                <span>Total Amount : </span>
                <span className="text-teal-500">{serviceDetails.totalAmt}</span>
                {route === "admin" && (
                  <form onSubmit={handleUpdateTotalAmt} className="inline">
                    <span className="inline-flex items-center ml-4 gap-4">
                      <Input
                        value={totalAmt}
                        onChange={setTotalAmt}
                        setRef={totalAmtRef}
                        type="number"
                        placeholder="Amount"
                        customClass="!w-20 !py-1 placeholder:text-slate-500"
                        clearInput={{
                          show: false,
                        }}
                      />
                      <button
                        type="submit"
                        className="px-4 py-1 text-slate-300 hover:text-slate-900 bg-slate-700 hover:bg-yellow-500 rounded transition-all"
                      >
                        Update
                      </button>
                    </span>
                  </form>
                )}
              </li>
              <li className="my-1 list-disc">
                <span>Due Amount : </span>
                {serviceDetails.totalAmt - serviceDetails.advanceAmt < 1 ? (
                  <span className="font-medium">
                    {serviceDetails.totalAmt - serviceDetails.advanceAmt !==
                      0 && " - "}
                    {serviceDetails.advanceAmt - serviceDetails.totalAmt}
                  </span>
                ) : (
                  <span className="text-red-500 font-medium">
                    {serviceDetails.totalAmt - serviceDetails.advanceAmt}
                  </span>
                )}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-gray-900 rounded-lg text-gray-200 body-font">
        <div className="max-w-[500px] p-10">
          <div className="w-full">
            <div className="w-full md:pr-10 md:py-6">
              {serviceProcess.map((process) => {
                if (process.status === "Accepted") {
                  return <Accepted key={process.ID} values={process} />;
                }
                if (process.status === "Pending") {
                  return (
                    <Pending
                      key={process.ID}
                      values={process}
                      scaleLarge={scaleLarge}
                    />
                  );
                }
                if (process.status === "Processing") {
                  return (
                    <Processing
                      key={process.ID}
                      values={process}
                      scaleLarge={scaleLarge}
                    />
                  );
                }
                if (
                  process.status === "Cancelled" ||
                  process.status === "Rejected"
                ) {
                  return (
                    <CancelledOrRejected
                      key={process.ID}
                      values={process}
                      scaleLarge={scaleLarge}
                    />
                  );
                }
                if (process.status === "Completed") {
                  return (
                    <Completed
                      key={process.ID}
                      values={process}
                      scaleLarge={scaleLarge}
                    />
                  );
                }
                if (process.status === "Delivered") {
                  return (
                    <Delivered
                      key={process.ID}
                      values={process}
                      scaleLarge={scaleLarge}
                    />
                  );
                }
              })}
            </div>
          </div>
        </div>
      </section>
      <span ref={scrollDownRef} />
    </div>
  );
}
