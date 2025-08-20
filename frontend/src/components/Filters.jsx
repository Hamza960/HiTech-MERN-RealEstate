import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setFilters, resetFilters } from '../features/ui/uiSlice.js';

export default function Filters() {
  const dispatch = useDispatch();
  const { filters } = useSelector(s => s.ui);

  const update = (e) => dispatch(setFilters({ [e.target.name]: e.target.value }));

  return (
    <div className="card grid grid-cols-2 md:grid-cols-4 gap-4">
      <div><label className="label">Type</label>
        <select name="type" value={filters.type} onChange={update} className="input">
          <option value="">Any</option>
          <option value="sale">Sale</option>
          <option value="rent">Rent</option>
        </select>
      </div>
      <div><label className="label">Location</label>
        <input name="location" value={filters.location} onChange={update} className="input" placeholder="e.g. Bengaluru" />
      </div>
      <div><label className="label">Min Price</label>
        <input name="minPrice" value={filters.minPrice} onChange={update} className="input" type="number" />
      </div>
      <div><label className="label">Max Price</label>
        <input name="maxPrice" value={filters.maxPrice} onChange={update} className="input" type="number" />
      </div>
      <div><label className="label">Bedrooms ≥</label>
        <input name="bedrooms" value={filters.bedrooms} onChange={update} className="input" type="number" />
      </div>
      <div><label className="label">Bathrooms ≥</label>
        <input name="bathrooms" value={filters.bathrooms} onChange={update} className="input" type="number" />
      </div>
      <div><label className="label">Min Area</label>
        <input name="minArea" value={filters.minArea} onChange={update} className="input" type="number" />
      </div>
      <div><label className="label">Max Area</label>
        <input name="maxArea" value={filters.maxArea} onChange={update} className="input" type="number" />
      </div>
      <div className="md:col-span-2"><label className="label">Amenities (comma separated)</label>
        <input name="amenities" value={filters.amenities} onChange={update} className="input" placeholder="pool,gym,parking" />
      </div>
      <div><label className="label">Sort</label>
        <select name="sort" value={filters.sort} onChange={update} className="input">
          <option value="newest">Newest</option>
          <option value="price_asc">Price ↑</option>
          <option value="price_desc">Price ↓</option>
          <option value="area_desc">Area ↓</option>
        </select>
      </div>
      <div className="flex items-end gap-2">
        <button className="btn" onClick={() => dispatch(resetFilters())}>Reset</button>
      </div>
    </div>
  );
}
