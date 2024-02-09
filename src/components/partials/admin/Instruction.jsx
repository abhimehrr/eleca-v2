export default function Instruction() {
  return (
    <div
      className="my-4 p-4 max-sm:mx-2 bg-gray-900 rounded-lg"
    >
      <h3 className="flex items-center sm:text-2xl text-xl font-bold title-font text-slate-200">
        Instructions
        <i className="fa-regular fa-flag ml-3"></i>
      </h3>

      <div className="flex justify-between px-4">
        <div className="mt-2">
          <h3 className="mb-2 text-lg font-medium text-teal-500">Status</h3>

          <div className="my-1 ml-5">
            <div className="text-gray-300">
              <div className="inline-block bg-gray-200 w-3 h-3 mr-2 rounded-full"></div>
              Accepted
            </div>
          </div>
          <div className="my-1 ml-5">
            <div className="text-gray-300">
              <div className="inline-block bg-yellow-500 w-3 h-3 mr-2 rounded-full"></div>
              Pending
            </div>
          </div>
          <div className="my-1 ml-5">
            <div className="text-gray-300">
              <div className="bg-red-600 inline-block w-3 h-3 mr-2 rounded-full"></div>
              Recjected / Cancelled
            </div>
          </div>
          <div className="my-1 ml-5">
            <div className="text-gray-300">
              <div className="inline-block bg-green-500 w-3 h-3 mr-2 rounded-full"></div>
              Completed / Delivered
            </div>
          </div>
        </div>

        <div className="mt-2">
          <h3 className="mb-2 text-lg font-medium text-teal-500">Actions</h3>

          <div className="my-1 ml-5">
            <div className="text-gray-300">
              <i className="fa-regular fa-eye text-gray-300 mr-3"></i>
              View Details
            </div>
          </div>
          <div className="my-1 ml-5">
            <div className="text-gray-300">
              <i className="fa-regular fa-trash-can mr-3 text-red-600"></i>
              Delete Request
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
