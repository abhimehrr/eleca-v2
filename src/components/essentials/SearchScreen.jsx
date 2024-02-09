import Input from "./Input";

export default function SearchScreen({
  children,
  title,
  closeSearch,
  placeholder,
  search,
  setSearch,
}) {
  return (
    <div className="fixed top-0 left-0 min-h-screen w-full px-2 bg-slate-800">
      <div className="max-w-[700px] px-4 py-6 mx-auto my-10 bg-slate-900 text-slate-200 rounded-lg">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button
            onClick={() => {
              closeSearch(false);
              setSearch("");
            }}
            className="grid place-items-center px-3 py-2 text-slate-200 hover:text-white bg-slate-600 hover:bg-slate-700 transition-all rounded-full"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
        <div className="relative flex gap-3 py-1 px-5 my-6 items-center bg-slate-700 rounded-full">
          <label htmlFor="search">
            <i className="fa-solid fa-search"></i>
          </label>
          <span className="h-6 w-0.5 bg-slate-300"></span>
          <Input
            value={search}
            onChange={setSearch}
            type="text"
            id="search"
            isFocus={true}
            placeholder={placeholder}
            resetClass={true}
            customClass="w-full placeholder:text-slate-300 bg-transparent transition-all border-none outline-none text-gray-100 py-1.5 pr-6 duration-200 ease-in-out"
            clearInput={{
              show: true,
              customClass: "top-1 right-0",
            }}
          />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
