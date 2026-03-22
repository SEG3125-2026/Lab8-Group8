import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { technicians } from '../data/servicesData';

function Technicians () {
    const navigate = useNavigate();
    const { updateBooking } = useBooking();

    const handleSelectTechnician = (technicianKey) => {
        updateBooking({ technicianKey });
        navigate('/bookrepair');
    };

    return (
        <main className="page">
            <h1 className="section-title center-title">Select One of our Technicians for Your Repair:</h1>
            <section className="tech-grid">
                {technicians.map((tech) => (
                    <div key={tech.key} className="mock-card technician-card">
                        <h2>{tech.name}:</h2>
                        <p>Available On:</p>
                        <p>{tech.available}</p>
                        <button onClick={() => handleSelectTechnician(tech.key)}>
                            Select
                        </button>
                    </div>
                ))}
            </section>
        </main>
    );
}
export default Technicians;