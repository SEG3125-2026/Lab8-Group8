import React from 'react';
import { NavLink } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

function Navbar() {
  const { language, toggleLanguage } = useBooking();

  const text = {
    en: {
      brand: 'Rideau Phone Repairs',
      home: 'Home',
      services: 'Services',
      technicians: 'Technicians',
      bookRepair: 'Book Repair',
      payment: 'Payment',
      switchTo: 'FR'
    },
    fr: {
      brand: 'Rideau Phone Repairs',
      home: 'Accueil',
      services: 'Services',
      technicians: 'Techniciens',
      bookRepair: 'Réserver',
      payment: 'Paiement',
      switchTo: 'EN'
    }
  };

  const t = text[language];

  return (
    <header>
      <nav className="navbar">
        <div className="logo">{t.brand}</div>
        <NavLink to="/">{t.home}</NavLink>
        <NavLink to="/services">{t.services}</NavLink>
        <NavLink to="/technicians">{t.technicians}</NavLink>
        <NavLink to="/bookrepair">{t.bookRepair}</NavLink>
        <NavLink to="/payment">{t.payment}</NavLink>

        <button type="button" className="lang-toggle-btn" onClick={toggleLanguage}>
          {t.switchTo}
        </button>
      </nav>
    </header>
  );
}

export default Navbar;