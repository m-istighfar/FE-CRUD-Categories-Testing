interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    const canGoBack = currentPage > 1;
    const canGoForward = currentPage < totalPages;

    return (
        <nav className='relative z-0 inline-flex rounded-md shadow-sm' aria-label='Pagination'>
            <button
                onClick={() => canGoBack && onPageChange(currentPage - 1)}
                className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                    !canGoBack && 'cursor-not-allowed opacity-50'
                }`}
                aria-disabled={!canGoBack}
            >
                <span className='sr-only'>Previous</span>
                &lt;
            </button>
            <div className='relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700'>
                {currentPage} of {totalPages}
            </div>
            <button
                onClick={() => canGoForward && onPageChange(currentPage + 1)}
                className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 ${
                    !canGoForward && 'cursor-not-allowed opacity-50'
                }`}
                aria-disabled={!canGoForward}
            >
                <span className='sr-only'>Next</span>
                &gt;
            </button>
        </nav>
    );
}

export default Pagination;
