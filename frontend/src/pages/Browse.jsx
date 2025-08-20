import React from "react";
import Filters from '../components/Filters.jsx';
import PropertyCard from '../components/PropertyCard.jsx';
import Pagination from '../components/Pagination.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../features/ui/uiSlice.js';
import { useGetPropertiesQuery } from '../lib/api.js';

export default function Browse() {
  const dispatch = useDispatch();
  const { filters, page, limit } = useSelector(s => s.ui);

  const query = {
    ...filters,
    page,
    limit,
    amenities: filters.amenities ? filters.amenities : undefined
  };

  const { data, isFetching } = useGetPropertiesQuery(query);
  const items = data?.data || [];
  const total = data?.total || 0;

  return (
    <div className="container py-6 space-y-4">
      <Filters />
      {isFetching && <div className="card">Loading...</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {items.map(p => <PropertyCard key={p._id} p={p} />)}
      </div>
      <Pagination page={page} limit={limit} total={total} onPage={(p) => dispatch(setPage(p))} />
    </div>
  );
}
