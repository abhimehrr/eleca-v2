import { host } from "../../utils/fetch";

// View Image
import ViewImage from "../partials/ViewImage";

export default function Completed({ values, scaleLarge }) {
  const route = window.location.pathname.split("/")[1];
  const imgUrl = host + "static/images/" + values.image;

  return (
    <div key={values.ID} className="flex relative pb-5">
      <div className="h-full w-10 absolute inset-0 flex items-center justify-center">
        <div className="h-full w-1 bg-gray-200 pointer-events-none"></div>
      </div>
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-500 inline-flex items-center justify-center text-white relative z-10">
        <i className="fa-solid fa-check"></i>
      </div>
      <div className="flex-grow pl-4">
        <h2 className="font-medium title-font text-sm text-gray-500 mb-1 tracking-wider">
          Completed
        </h2>
        <p className="font-medium title-font text-sm text-gray-500 mb-1 tracking-wider">
          {values.time}
        </p>
        <div className="flex flex-col leading-relaxed">
          <span>
            We have finished processing your service request. Your item is now
            repaired, ready for delivery.
          </span>
          {values?.comments?.length > 0 && (
            <span className="mt-3">
              <span className="text-teal-600 font-medium">Issues Fixed :</span>
              <ul className="ml-5 text-gray-200">
                {values.comments.split(",").map((comment) => (
                  <li key={comment} className="list-disc">
                    {comment}
                  </li>
                ))}
              </ul>
            </span>
          )}
        </div>
        <div className="mt-3">
          {values?.image?.length > 1 && (
            <div
              onClick={scaleLarge}
              className="image-box relative w-36 rounded transition-all cursor-pointer"
              style={{ "--src": "url(" + imgUrl + ")" }}
            >
              {route === "admin" && <ViewImage imgUrl={imgUrl} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
