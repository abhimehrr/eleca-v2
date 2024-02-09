import { Link } from "react-router-dom";

export default function DonwloadImage({ imgUrl }) {
  return (
    <Link
      to={imgUrl}
      target="_blank"
      className="absolute bottom-2 right-2 w-8 aspect-square grid place-items-center bg-gray-800 bg-opacity-70 text-gray-100 hover:bg-gray-800 rounded transition-all"
    >
      <i className="fa-regular fa-eye"></i>
    </Link>
  );
}