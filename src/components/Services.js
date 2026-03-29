import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { services } from '../data/servicesData';

function Services() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { updateBooking, language } = useBooking();

  const text = {
    en: {
      title: 'Select one of our Service Repairs:',
      price: 'Price',
      time: 'Time',
      select: 'Select'
    },
    fr: {
      title: 'Sélectionnez un de nos services de réparation :',
      price: 'Prix',
      time: 'Durée',
      select: 'Choisir'
    }
  };

  const t = text[language];

  useEffect(() => {
    const serviceKey = searchParams.get('service');
    if (serviceKey) {
      updateBooking({ serviceKey });
    }
  }, [searchParams, updateBooking]);

  const handleSelectService = (serviceKey) => {
    updateBooking({ serviceKey });
    navigate('/technicians');
  };

  return (
    <main className="page">
      <h1 className="section-title center-title">{t.title}</h1>
      <section className="mock-grid">
        {services.map((service) => (
          <div key={service.key} className="mock-card service-card">
            <img
              src={service.image}
              alt={service.name[language]}
              className="service-card-image"
              onClick={() => handleSelectService(service.key)}
            />
            <h2>{service.name[language]}:</h2>
            <p>{t.price}: ${service.price}</p>
            <p>{t.time}: {service.time[language]}</p>
            <button onClick={() => handleSelectService(service.key)}>
              {t.select}
            </button>
          </div>
        ))}
      </section>
    </main>
  );
}

export default Services;