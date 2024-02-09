import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="my-2 bg-gray-900s rounded-lg max-sm:mx-4">
        <div className="flex items-center justify-between text-gray-400 text-sm">
            <div className="font-medium">
                © {new Date().getFullYear()} 
                <span className="text-teal-400 mx-2">{'>'}</span>
                <Link to="/" className="hover:text-teal-500">Ashok Electronics</Link>
            </div>

            <div className="flex items-center font-medium">
                Developed 
                <span className="text-teal-400 mx-2">{'>'}</span>
                <Link to="https://a.shre.in/" className="hover:text-teal-500" target="_blank">Abhishek</Link>
            </div>
        </div>   
    </footer>
  );
}