export const UpdateModal = ({ title, children, closeModal }) => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-slate-800 fixed top-0 left-0 z-50">
      <div className="relative min-w-56 max-w-[450px] min-h-10 py-6 px-6 max-sm:mx-2 text-slate-200 bg-slate-900 rounded-lg">
        <h2 className="font-semibold tracking-wide text-left text-xl text-teal-500">
          {title}
        </h2>
        <button
          onClick={() => closeModal(false)}
          className="absolute top-4 right-6 text-xl text-slate-400 hover:text-red-500 transition-all"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
        <div className="max-h-96 search-manager-scroll overflow-y-scroll my-2">
          {children}
        </div>
      </div>
    </div>
  );
};
