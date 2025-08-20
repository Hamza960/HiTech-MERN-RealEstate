import React from "react";
import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
  const link = 'px-3 py-2 rounded-xl';
  const active = 'bg-blue-600 text-white';
  return (
    <nav className="bg-white shadow sticky top-0 z-10">
      <div className="container flex items-center justify-between h-14">
        <Link to="/" className="font-bold text-lg">HiTech</Link>
        <div className="flex gap-2">
          <NavLink to="/" end className={({isActive}) => `${link} ${isActive ? active : ''}`}>Browse</NavLink>
          <NavLink to="/agent" className={({isActive}) => `${link} ${isActive ? active : ''}`}>Agent CMS</NavLink>
        </div>
      </div>
    </nav>
  );
}
