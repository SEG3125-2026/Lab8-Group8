import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { technicians } from '../data/servicesData';

function Technicians() {
  const navigate = useNavigate();
  const { updateBooking, language } = useBooking();

  const text = {
    en: {
      title: 'Select One of our Technicians for Your Repair:',
      availableOn: 'Available On:',
      select: 'Select'
    },
    fr: {
      title: 'Sélectionnez un de nos techniciens pour votre réparation :',
      availableOn: 'Disponible :',
      select: 'Choisir'
    }
  };

  const t = text[language];

  const handleSelectTechnician = (technicianKey) => {
    updateBooking({ technicianKey });
    navigate('/bookrepair');
  };

  return (
    <main className="page">
      <h1 className="section-title center-title">{t.title}</h1>
      <section className="tech-grid">
        {technicians.map((tech) => (
          <div key={tech.key} className="mock-card technician-card">
            <h2>{tech.name}:</h2>
            <p>{t.availableOn}</p>
            <p>{tech.available[language]}</p>
            <button onClick={() => handleSelectTechnician(tech.key)}>
              {t.select}
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Technicians;