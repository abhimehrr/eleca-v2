import { Link } from "react-router-dom";
import { host } from "../../utils/fetch";

export default function ServiceCard({ values }) {
  var { ID, itemName, cName, currentStatus, image } = values;
  image = host + "static/images/" + image;

  return (
    <Link to={`/service-request/${ID}`}>
      <div className="flex items-center relative group hover:border-gray-300 hover:bg-slate-800 transition-all duration-300 border-gray-600 border p-4 rounded-lg">
        <div
          className="image-box mr-4 w-20 rounded transition-all cursor-pointer"
          style={{ "--src": `url(${image})` }}
        ></div>

        <div className="flex-grow text-left tracking-wide">
          <p className="text-gray-300 flex items-center gap-3 capitalize text-sm">
            <span>Request Id : {ID}</span>
            <span className="text-teal-500">|</span>
            <span>{cName}</span>
          </p>
          <h2 className="text-teal-500 text-lg capitalize font-bold my-1">
            {itemName}
          </h2>
          <div className="flex items-center">
            <div
              className={`w-2 aspect-square mr-2 ${
                currentStatus === "Processing" ||
                currentStatus === "Completed" ||
                currentStatus === "Delivered"
                  ? "bg-green-400"
                  : currentStatus === "Pending"
                  ? "bg-yellow-400"
                  : currentStatus === "Cencelled" ||
                    currentStatus === "Rejected"
                  ? "bg-red-400"
                  : "bg-gray-200"
              } rounded-full`}
            />
            <p className="text-gray-300 text-sm">{currentStatus}</p>
          </div>
        </div>
        <div className="absolute top-3 right-8 group-hover:text-teal-500 group-hover:translate-x-4 transition-all duration-300 rounded">
          <i className="fa-solid fa-arrow-right-long text-xl"></i>
        </div>
      </div>
    </Link>
  );
}
