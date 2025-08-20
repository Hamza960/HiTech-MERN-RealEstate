import React from "react";
export default function Pagination({ page, limit, total, onPage }) {
  const totalPages = Math.max(1, Math.ceil((total || 0) / (limit || 1)));
  return (
    <div className="flex gap-2 items-center justify-center mt-6">
      <button className="btn" disabled={page <= 1} onClick={() => onPage(page - 1)}>Prev</button>
      <span>Page {page} / {totalPages}</span>
      <button className="btn" disabled={page >= totalPages} onClick={() => onPage(page + 1)}>Next</button>
    </div>
  );
}
