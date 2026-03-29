import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { services } from '../data/servicesData';

function Home() {
  const navigate = useNavigate();
  const { language, updateBooking } = useBooking();

  const text = {
    en: {
      title: 'Rideau Phone Repairs',
      subtitle: 'Fast and Reliable Phone Repair Services',
      businessHours: 'Business Hours:',
      weekdayHours: 'Monday - Friday: 9 am - 5 pm',
      saturdayHours: 'Saturday: 10 am - 6 pm',
      ourServices: 'Our Services:',
      bookRepair: 'Book a Repair'
    },
    fr: {
      title: 'Rideau Phone Repairs',
      subtitle: 'Services de réparation de téléphones rapides et fiables',
      businessHours: 'Heures d’ouverture :',
      weekdayHours: 'Lundi au vendredi : 9 h à 17 h',
      saturdayHours: 'Samedi : 10 h à 18 h',
      ourServices: 'Nos services :',
      bookRepair: 'Prendre un rendez vous'
    }
  };

  const t = text[language];

  const handleServiceClick = (serviceKey) => {
    updateBooking({ serviceKey });
    navigate(`/services?service=${serviceKey}`);
  };

  return (
    <main className="page">
      <section className="home-top">
        <div className="home-left">
          <h1>{t.title}</h1>
          <h2>{t.subtitle}</h2>
        </div>

        <div className="home-right">
          <h2>{t.businessHours}</h2>
          <p>{t.weekdayHours}</p>
          <p>{t.saturdayHours}</p>
        </div>
      </section>

      <section className="services-preview">
        <h2 className="section-title">{t.ourServices}</h2>

        <div className="services-preview-grid">
          {services.map((service) => (
            <div key={service.key} className="preview-item" onClick={() => handleServiceClick(service.key)}>
              <img src={service.image} alt={service.name[language]} />
              <p>{service.name[language]}</p>
            </div>
          ))}
        </div>

<<<<<<< HEAD:rideau-repairs/src/components/Home.js
        <div className="center-action">
          <button className="button-link" onClick={() => navigate('/services')}>
            {t.bookRepair}
          </button>
=======
        <div className="preview-item" onClick={() => navigate('/services')}>
          <img src="images/12.jpeg" alt="Charging Port Repair" />
          <p>Charging Port Repair</p>
>>>>>>> 1b6f41d13e7d49a4a2c21fd7ac49434b1e3a6427:src/components/Home.js
        </div>
      </section>
    </main>
  );
}

export default Home;