import React from 'react';

const Pagination = ({ currentPage, lastPage, onPageChange }) => {

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(lastPage, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    if (start > 1) {
      pages.push(
        <button key={1} onClick={() => onPageChange(1)} className={`w-8 h-8 rounded hover:bg-orange-200 ${currentPage === 1 ? 'bg-orange-500 text-white' : 'text-gray-700'}`}>1</button>
      );
      if (start > 2) pages.push(<span key="dots1" className="px-2">...</span>);
    }

    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`w-8 h-8 rounded hover:bg-orange-200 ${currentPage === i ? 'bg-orange-500 text-white' : 'text-gray-700'}`}
        >
          {i}
        </button>
      );
    }

    if (end < lastPage) {
      if (end < lastPage - 1) pages.push(<span key="dots2" className="px-2">...</span>);
      pages.push(
        <button key={lastPage} onClick={() => onPageChange(lastPage)} className={`w-8 h-8 rounded hover:bg-orange-200 ${currentPage === lastPage ? 'bg-orange-500 text-white' : 'text-gray-700'}`}>{lastPage}</button>
      );
    }

    return pages;
  };

  if (lastPage <= 1) return null;

  return (
    <div className="flex justify-center items-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-gray-600 disabled:opacity-50 hover:bg-gray-100"
      >
        &laquo;
      </button>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-1 text-gray-600 disabled:opacity-50 hover:bg-gray-100"
      >
        &lsaquo;
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
        className="px-3 py-1 text-gray-600 disabled:opacity-50 hover:bg-gray-100"
      >
        &rsaquo;
      </button>
      <button
        onClick={() => onPageChange(lastPage)}
        disabled={currentPage === lastPage}
        className="px-3 py-1 text-gray-600 disabled:opacity-50 hover:bg-gray-100"
      >
        &raquo;
      </button>
    </div>
  );
};

export default Pagination;
