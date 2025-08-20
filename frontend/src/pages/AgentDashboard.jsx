import React from "react";
import { useState } from 'react';
import { useGetPropertiesQuery, useCreatePropertyMutation, useUpdatePropertyMutation, useArchivePropertyMutation, useUnarchivePropertyMutation, useDeletePropertyMutation, useGetClientsQuery, useUpdateClientMutation, useDeleteClientMutation, useGetViewingsQuery, useCreateViewingMutation, useUpdateViewingMutation, useDeleteViewingMutation } from '../lib/api.js';

function Section({ title, children }) {
  return <div className="card"><h2 className="font-semibold text-lg mb-3">{title}</h2>{children}</div>;
}

export default function AgentDashboard() {
  // Properties
  const { data: list = { data: [], total: 0 }, refetch } = useGetPropertiesQuery({ limit: 50, isActive: '' });
  const [createProperty] = useCreatePropertyMutation();
  const [updateProperty] = useUpdatePropertyMutation();
  const [archiveProperty] = useArchivePropertyMutation();
  const [unarchiveProperty] = useUnarchivePropertyMutation();
  const [deleteProperty] = useDeletePropertyMutation();

  // Clients
  const { data: clients = { data: [] } } = useGetClientsQuery({ limit: 50 });
  const [updateClient] = useUpdateClientMutation();
  const [deleteClient] = useDeleteClientMutation();

  // Viewings
  const { data: viewings = { data: [] } } = useGetViewingsQuery({ limit: 50 });
  const [createViewing] = useCreateViewingMutation();
  const [updateViewing] = useUpdateViewingMutation();
  const [deleteViewing] = useDeleteViewingMutation();

  const [newProp, setNewProp] = useState({ title: '', price: '', type: 'sale', location: '', bedrooms: 1, bathrooms: 1, area: 500, amenities: '', images: '' });

  const addProperty = async (e) => {
    e.preventDefault();
    const payload = {
      ...newProp,
      price: Number(newProp.price),
      bedrooms: Number(newProp.bedrooms),
      bathrooms: Number(newProp.bathrooms),
      area: Number(newProp.area),
      amenities: newProp.amenities ? newProp.amenities.split(',').map(s=>s.trim()) : [],
      images: newProp.images ? newProp.images.split(',').map(s=>s.trim()) : []
    };
    await createProperty(payload).unwrap();
    setNewProp({ title: '', price: '', type: 'sale', location: '', bedrooms: 1, bathrooms: 1, area: 500, amenities: '', images: '' });
    refetch();
  };

  return (
    <div className="container py-6 grid gap-4">
      <Section title="Add Property">
        <form className="grid md:grid-cols-3 gap-2" onSubmit={addProperty}>
          <input className="input" placeholder="Title" value={newProp.title} onChange={e=>setNewProp({...newProp, title:e.target.value})} required />
          <input className="input" placeholder="Price" type="number" value={newProp.price} onChange={e=>setNewProp({...newProp, price:e.target.value})} required />
          <select className="input" value={newProp.type} onChange={e=>setNewProp({...newProp, type:e.target.value})}>
            <option value="sale">Sale</option><option value="rent">Rent</option>
          </select>
          <input className="input" placeholder="Location" value={newProp.location} onChange={e=>setNewProp({...newProp, location:e.target.value})} required />
          <input className="input" placeholder="Bedrooms" type="number" value={newProp.bedrooms} onChange={e=>setNewProp({...newProp, bedrooms:e.target.value})} />
          <input className="input" placeholder="Bathrooms" type="number" value={newProp.bathrooms} onChange={e=>setNewProp({...newProp, bathrooms:e.target.value})} />
          <input className="input" placeholder="Area (sqft)" type="number" value={newProp.area} onChange={e=>setNewProp({...newProp, area:e.target.value})} />
          <input className="input md:col-span-2" placeholder="Amenities (comma sep)" value={newProp.amenities} onChange={e=>setNewProp({...newProp, amenities:e.target.value})} />
          <input className="input md:col-span-2" placeholder="Images URLs (comma sep)" value={newProp.images} onChange={e=>setNewProp({...newProp, images:e.target.value})} />
          <textarea className="input md:col-span-3" placeholder="Description" value={newProp.description||''} onChange={e=>setNewProp({...newProp, description:e.target.value})} />
          <button className="btn btn-primary md:col-span-3">Create</button>
        </form>
      </Section>

      <Section title="Manage Properties">
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead><tr className="text-left"><th>Title</th><th>Type</th><th>Price</th><th>Location</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody>
              {list.data.map(p => (
                <tr key={p._id} className="border-t">
                  <td>{p.title}</td>
                  <td>{p.type}</td>
                  <td>₹{p.price.toLocaleString()}</td>
                  <td>{p.location}</td>
                  <td>{p.isActive ? 'Active' : 'Archived'}</td>
                  <td className="space-x-1">
                    {p.isActive
                      ? <button className="btn" onClick={()=>archiveProperty(p._id)}>Archive</button>
                      : <button className="btn" onClick={()=>unarchiveProperty(p._id)}>Unarchive</button>}
                    <button className="btn" onClick={()=>deleteProperty(p._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Client Inquiries">
        <div className="overflow-auto">
          <table className="min-w-full text-sm">
            <thead><tr className="text-left"><th>Name</th><th>Email</th><th>Phone</th><th>Property</th><th>Processed</th><th>Actions</th></tr></thead>
            <tbody>
              {clients.data.map(c => (
                <tr key={c._id} className="border-t">
                  <td>{c.name}</td>
                  <td>{c.email}</td>
                  <td>{c.phone}</td>
                  <td>{c.interestedProperty?.title}</td>
                  <td>{String(c.processed)}</td>
                  <td className="space-x-1">
                    <button className="btn" onClick={()=>updateClient({ id: c._id, processed: !c.processed })}>Toggle</button>
                    <button className="btn" onClick={()=>deleteClient(c._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <Section title="Viewings">
        <CreateViewing clients={clients.data} properties={list.data} onCreate={createViewing} />
        <div className="overflow-auto mt-3">
          <table className="min-w-full text-sm">
            <thead><tr className="text-left"><th>Property</th><th>Client</th><th>Date</th><th>Status</th><th>Notes</th><th>Actions</th></tr></thead>
            <tbody>
              {viewings.data.map(v => (
                <tr key={v._id} className="border-t">
                  <td>{v.property?.title}</td>
                  <td>{v.client?.name}</td>
                  <td>{new Date(v.date).toLocaleString()}</td>
                  <td>{v.status}</td>
                  <td>{v.notes}</td>
                  <td className="space-x-1">
                    <button className="btn" onClick={()=>updateViewing({ id: v._id, status: 'completed' })}>Complete</button>
                    <button className="btn" onClick={()=>updateViewing({ id: v._id, status: 'no-show' })}>No-show</button>
                    <button className="btn" onClick={()=>deleteViewing(v._id)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>
    </div>
  );
}

function CreateViewing({ clients, properties, onCreate }) {
  const [form, setForm] = useState({ client: '', property: '', date: '', notes: '' });
  const submit = async (e) => {
    e.preventDefault();
    if (!form.client || !form.property || !form.date) return alert('Fill all fields');
    await onCreate({ ...form }).unwrap();
    setForm({ client: '', property: '', date: '', notes: '' });
    alert('Viewing scheduled');
  };
  return (
    <form className="grid md:grid-cols-4 gap-2" onSubmit={submit}>
      <select className="input" value={form.client} onChange={e=>setForm({...form, client:e.target.value})}>
        <option value="">Select Client</option>
        {clients.map(c => <option key={c._id} value={c._id}>{c.name}</option>)}
      </select>
      <select className="input" value={form.property} onChange={e=>setForm({...form, property:e.target.value})}>
        <option value="">Select Property</option>
        {properties.map(p => <option key={p._id} value={p._id}>{p.title}</option>)}
      </select>
      <input className="input" type="datetime-local" value={form.date} onChange={e=>setForm({...form, date:e.target.value})} />
      <input className="input" placeholder="Notes" value={form.notes} onChange={e=>setForm({...form, notes:e.target.value})} />
      <button className="btn btn-primary md:col-span-4">Create Viewing</button>
    </form>
  );
}
