export default function Pagination({ data, pageNumber, resultPerPage, setPageNumber }) {
    // Handle Next
    const handleNext = () => {
        if(Math.ceil(data.length/resultPerPage) === pageNumber) return
        setPageNumber(pre => pre+1)
    }
    // Handle Previous
    const handlePrev = () => {
        if(pageNumber === 1) return
        setPageNumber(pre => pre-1)
    }

    return (
        <div className="flex items-center justify-between">
            <button
                onClick={handlePrev} 
                className={`text-sm p-2 ${pageNumber === 1 ? 'cursor-not-allowed' : 'hover:bg-red-600 hover:text-slate-900'} flex items-center justify-center text-slate-200 bg-gray-700 transition-all rounded`}
            >
                <i className="fa-solid fa-arrow-left"></i>
            </button>
            <div className="flex items-center justify-center gap-x-2">
                <div className="text-left mb-2">
                    [ Showing {(pageNumber * resultPerPage) > data.length ? data.length : pageNumber * resultPerPage} of {data.length} results ]
                </div> 
            </div>
            <button 
                onClick={handleNext} 
                className={`text-sm p-2 ${Math.ceil(data.length/resultPerPage) === pageNumber ? 'cursor-not-allowed' : 'hover:text-slate-900 hover:bg-teal-600'} flex items-center justify-center text-slate-200 bg-gray-700 transition-all rounded`}
            >
                <i className="fa-solid fa-arrow-right"></i>
            </button>    
        </div>
    )
}
