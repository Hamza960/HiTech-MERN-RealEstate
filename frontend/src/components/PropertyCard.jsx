import React from "react";
import { Link } from 'react-router-dom';

export default function PropertyCard({ p }) {
  return (
    <div className="card flex flex-col">
      <img src={p.images?.[0] || 'https://placehold.co/800x500?text=Property'} alt={p.title} className="rounded-xl mb-2 object-cover aspect-video" />
      <div className="flex-1">
        <h3 className="font-semibold text-lg">{p.title}</h3>
        <p className="text-sm text-gray-600">{p.location}</p>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <span className="font-bold">₹{p.price.toLocaleString()}</span>
        <Link className="btn btn-primary" to={`/property/${p._id}`}>View</Link>
      </div>
    </div>
  );
}
