import React from 'react';
import { NavLink } from 'react-router-dom';


function Navbar() {
  return (
    <header>
    <nav className="navbar">
      <div className="logo">Rideau Phone Repairs</div>
      <NavLink to="/">Home</NavLink>
      <NavLink to="/services">Services</NavLink>
      <NavLink to="/technicians">Technicians</NavLink>
      <NavLink to="/bookRepair">Book Repair</NavLink>
      <NavLink to="/payment">Payment</NavLink>
    </nav>
  </header>
  );
}

export default Navbar;