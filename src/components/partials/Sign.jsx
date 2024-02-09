export default ({ sign }) => {
  return (
    <div
      title={`Digitally Sign by ${sign}`}
      className="absolute bottom-0 left-0"
    >
      <div className="flex flex-col tracking-wide items-center justify-end text-xs px-2 py-1 sm:px-4 sm:py-2 bg-slate-800 opacity-70 rounded-tr-md">
        <span className="mb-1.5 text-slate-100">
          Digitally Sign
        </span>
        <span
          title={`Signature of ${sign}`}
          className="px-2 py-1 mb-1 font-medium bg-teal-500 text-gray-800 rounded"
        >
          {sign}
        </span>
      </div>
    </div>
  );
};
