import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
    const navigate = useNavigate();
    return (
        <main className="page">
    <section className="home-top">
      <div className="home-left">
        <h1>Rideau Phone Repairs</h1>
        <h2>Fast and Reliable Phone Repair Services</h2>
      </div>

      <div className="home-right">
        <h2>Business Hours:</h2>
        <p>Monday - Friday: 9 am - 5 pm</p>
        <p>Saturday: 10 am - 6 pm</p>
      </div>
    </section>

    <section className="services-preview">
      <h2 className="section-title">Our Services:</h2>

      <div className="services-preview-grid">
        <div className="preview-item" onClick={() => navigate('/services')}>
          <img src="images/images.jpeg" alt="Screen Repair" />
          <p>Screen Repair</p>
        </div>

        <div className="preview-item" onClick={() => navigate('/services')}>
          <img src="images/v4-460px-Fix-a-Bike-Tire-Step-2.jpg" alt="Battery Replacement" />
          <p>Battery Replacement</p>
        </div>

        <div className="preview-item" onClick={() => navigate('/services')}>
          <img src="images/12.jpeg" alt="Charging Port Repair" />
          <p>Charging Port Repair</p>
        </div>

        <div className="preview-item" onClick={() => navigate('/services')}>
          <img src="images/water-damage-repair.jpg" alt="Water Damage Repair" />
          <p>Water Damage Repair</p>
        </div>
      </div>

      <div className="center-action">
        <button className="button-link" onClick={() => navigate('/services')}> 
        Book a Repair</button>
      </div>
    </section>
  </main>
    );
}
export default Home