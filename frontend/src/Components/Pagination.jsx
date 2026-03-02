const Pagination = ({ page, totalPages, setPage }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        disabled={page === 1}
        onClick={() => setPage(prev => prev - 1)}
      >
        ← Prev
      </button>

      {[...Array(totalPages)].map((_, index) => {
        const pageNumber = index + 1;

        return (
          <button
            key={pageNumber}
            onClick={() => setPage(pageNumber)}
            className={page === pageNumber ? "active" : ""}
          >
            {pageNumber}
          </button>
        );
      })}

      <button
        disabled={page === totalPages}
        onClick={() => setPage(prev => prev + 1)}
      >
        Next →
      </button>
    </div>
  );
};

export default Pagination;