import React from "react";
import { useParams } from 'react-router-dom';
import { useGetPropertyQuery, useCreateInquiryMutation } from '../lib/api.js';
import { useState } from 'react';

export default function PropertyDetails() {
  const { id } = useParams();
  const { data: p, isFetching } = useGetPropertyQuery(id);
  const [createInquiry, { isLoading }] = useCreateInquiryMutation();
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });

  if (isFetching) return <div className="container py-6"><div className="card">Loading...</div></div>;
  if (!p) return <div className="container py-6"><div className="card">Not found</div></div>;

  const submit = async (e) => {
    e.preventDefault();
    await createInquiry({ ...form, interestedProperty: p._id }).unwrap();
    alert('Inquiry submitted!');
    setForm({ name: '', email: '', phone: '', message: '' });
  };

  return (
    <div className="container py-6 grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 space-y-3">
        <img src={p.images?.[0] || 'https://placehold.co/1200x700?text=Property'} className="rounded-2xl w-full object-cover" />
        <div className="card">
          <h1 className="text-2xl font-bold">{p.title}</h1>
          <p className="text-gray-600">{p.location}</p>
          <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2 text-sm">
            <div><b>Price:</b> ₹{p.price.toLocaleString()}</div>
            <div><b>Type:</b> {p.type}</div>
            <div><b>Beds:</b> {p.bedrooms}</div>
            <div><b>Baths:</b> {p.bathrooms}</div>
            <div><b>Area:</b> {p.area} sqft</div>
          </div>
          <p className="mt-3">{p.description}</p>
          <div className="mt-3">
            <b>Amenities:</b> {p.amenities?.join(', ') || '—'}
          </div>
        </div>
      </div>
      <div className="space-y-3">
        <form className="card space-y-2" onSubmit={submit}>
          <h2 className="font-semibold text-lg">Schedule a viewing / Ask about this property</h2>
          <input className="input" placeholder="Name" value={form.name} onChange={e=>setForm({...form, name:e.target.value})} required />
          <input className="input" placeholder="Email" type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} required />
          <input className="input" placeholder="Phone" value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} />
          <textarea className="input" placeholder="Message" value={form.message} onChange={e=>setForm({...form, message:e.target.value})} />
          <button className="btn btn-primary" disabled={isLoading}>Submit Inquiry</button>
        </form>
      </div>
    </div>
  );
}
