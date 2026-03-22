import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';
import { services } from '../data/servicesData';

function Services() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { updateBooking } = useBooking();

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
            <h1 className="section-title center-title">Select one of our Service Repairs</h1>
            <section className="mock-grid">
                {services.map((service) => (
                 <div key={service.key} className="mock-card service-card" >
                    <img
                    src={service.image}
                    alt={service.name}
                    className="service-card-image"
                    onClick={() => handleSelectService(service.key)}
                    />
                    <h2>{service.name}:</h2>
                    <p>Price: ${service.price}</p>
                    <p>Time: {service.time}</p>
                    <button onClick={() => handleSelectService(service.key)} >
                        Select
                    </button>
                 </div>
                ))}
            </section>
        </main>
    );
}
export default Services;