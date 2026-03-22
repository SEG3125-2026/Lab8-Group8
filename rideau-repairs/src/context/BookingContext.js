import React, { createContext, useState, useContext, useEffect } from 'react';

const STORAGE_KEY = "repairBooking";
const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [bookingData, setBookingData] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            return {};
        }
    });

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(bookingData));
    }, [bookingData]);

    const updateBooking = (data) => {
        setBookingData(prev => ({ ...prev, ...data }));
    };

    const clearBooking = () => {
        setBookingData({});
        localStorage.removeItem(STORAGE_KEY);
    };

    const findServiceByKey = (key) => {
        const { services } = require('../data/servicesData');
        return services.find(service => service.key == key) ;
    };

    const findTechnicianByKey = (key) => {
        const { technicians } = require('../data/servicesData');
        return technicians.find(tech => tech.key == key);
    };

    return (
        <BookingContext.Provider value={{
            bookingData,
            updateBooking,
            clearBooking,
            findServiceByKey,
            findTechnicianByKey
        }}>
            {children}
        </BookingContext.Provider>
    );
};