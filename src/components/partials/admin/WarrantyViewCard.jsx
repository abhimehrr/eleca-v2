import { Link } from "react-router-dom";
import { host } from "../../../utils/fetch";

export default function WarrantyViewCard({ values }) {
  var { ID, itemName, cName, cAddress, dop, period, image } = values;
  image = host + "static/images/" + image;

  return (
    <Link to={`/admin/warranty-info/${ID}`}>
      <div className="flex relative group gap-4 items-center hover:border-gray-300 hover:bg-slate-800 transition-all duration-300 border-gray-600 border p-4 rounded-lg">
        <div
          className="image-box w-24 rounded transition-all cursor-pointer"
          style={{ "--src": `url(${image})` }}
        ></div>

        <div className="flex-grow text-left tracking-wide">
          <p className="text-gray-300 flex items-center gap-2 capitalize text-sm">
            <span>{cName}</span>
            <span className="text-teal-500">|</span>
            <span>{cAddress}</span>
          </p>

          <h2 className="text-teal-500 text-lg capitalize font-bold my-1">
            {itemName}
          </h2>
          <p className="text-gray-300 flex items-center gap-2 capitalize text-sm">
            <span>Serial No. : {ID}</span>
            <span className="text-teal-500">|</span>
            <span>{period} month</span>
          </p>
          <p className="text-gray-300 flex items-center gap-3 mt-1 text-sm">
            <span>Date of Purchase : {dop}</span>
          </p>
        </div>
        <div className="hidden sm:block absolute top-3 right-8 group-hover:text-teal-500 group-hover:translate-x-4 transition-all duration-300 rounded">
          <i className="fa-solid fa-arrow-right-long text-xl"></i>
        </div>
      </div>
    </Link>
  );
}
