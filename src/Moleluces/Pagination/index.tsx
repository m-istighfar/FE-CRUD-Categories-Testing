import React from 'react';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    handlePageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, handlePageChange }) => {
    return (
        <div className='mt-4'>
            <nav
                className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                aria-label='Pagination'
            >
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                >
                    <span className='sr-only'>Previous</span>
                    <span>&laquo;</span>
                </button>
                {[...Array(totalPages).keys()].map((_, index) => (
                    <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 ${
                            currentPage === index + 1 && 'bg-gray-200'
                        }`}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                >
                    <span className='sr-only'>Next</span>
                    <span>&raquo;</span>
                </button>
            </nav>
        </div>
    );
};

export default Pagination;
