import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { host, useFetch } from "../../utils/fetch";

// Components
import { Loader } from "../../components/partials/loader/Loader";
import ViewImage from "../../components/partials/ViewImage";
import Sign from "../../components/partials/Sign";

// Invalid Image
import InvalidImg from "../../assets/Invalid.jpg";

export default function WarrantyInfo() {
  const { token } = useSelector((s) => s.admin);
  const { id } = useParams();

  const [loader, setLoader] = useState(false);
  const [error, setError] = useState(false);

  const [card, setCard] = useState(null);

  useEffect(() => {
    (async () => {
      setLoader(true);
      const data = await useFetch("check-warranty-card", {
        method: "POST",
        authtoken: token,
        body: { search: id },
      });

      if (data?.data?.length < 1) {
        setError(true);
        return;
      }
      setLoader(false);
      setCard(data.data[0]);
    })();

    // window.scrollTo({ top: 0, behavior: "smooth" });

    document.title = "Warranty Card Info | Eleca";
  }, []);

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

      <section className="py-5">
        <div className="flex items-start max-md:flex-col gap-4 md:gap-8 bg-slate-900 p-8 w-full rounded-lg">
          <div className="w-full md:w-1/2 relative">
            <div className="absolute w-full h-full blur-sm bg-opacity-75 bg-slate-100"></div>
            <div className="w-full aspect-square bg-slate-300 relative overflow-hidden rounded-lg">
              <div
                className="main-image-box relative h-full w-full transition-all cursor-pointer"
                style={{
                  "--src": "url(" + host + "static/images/" + card?.image + ")",
                }}
              >
                <ViewImage imgUrl={host + "static/images/" + card?.image} />
                <Sign sign={card?.adminName} />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <div className="capitalize text-2xl lg:text-3xl max-md:mt-4 font-bold text-green-400">
              Genuine & a valid card
              <div className="w-full h-[1px] my-5 bg-slate-600" />
            </div>
            <div className="flex flex-wrap gap-3 capitalize text-lg text-slate-400">
              <p>{card?.cName}</p>
              <span className="text-teal-600">|</span>
              <p>{card?.cAddress}</p>
              <span className="text-teal-600">|</span>
              <p>{card?.cMobile}</p>
            </div>
            <h2 className="capitalize text-teal-500 text-2xl font-bold my-4">
              {card?.itemName}
            </h2>
            <div className="flex flex-col gap-1 capitalize tracking-wide text-slate-400">
              <p className="flex items-center gap-2 flex-wrap">
                Serial Number :
                <span className="text-slate-200">{card?.ID}</span>
              </p>
              <p className="flex items-center gap-2 flex-wrap">
                Warranty Period :
                <span className="text-slate-200">{card?.period} month</span>
              </p>
              <p className="flex items-center gap-2 flex-wrap">
                Date of Purchase :
                <span className="text-slate-200 uppercase">
                  {card?.dop?.split(",")[0].trim()}
                  <span className="mx-2 text-teal-500">|</span>

                  {card?.dop?.split(",")[1].trim()}
                </span>
              </p>
              {card?.comments.length > 1 && (
                <div className="text-teal-500">
                  Conditions :
                  <ul className="text-slate-400 ml-8">
                    {card?.comments.split(",").map((c) => (
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
  );
}
