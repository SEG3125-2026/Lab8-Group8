import React, { createContext, useState, useContext, useEffect } from 'react';

const STORAGE_KEY = "repairBooking";
const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
    const [bookingData, setBookingData] = useSate(() => {
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

    const updateBooking = () => {
        setBookingData(prev => ({ ...prev, ...data }));
    };

    const clearBooking = () => {
        setBookingData({});
        localStorage.removeItem(STORAGE_KEY);
    };

    const finServiceByKey = (key) => {
        const { services } = require('../src/servicesData');
        return services.find(service => service.key == key) ;
    };

    const findTechnicianKey = (key) => {
        const { technicans } = require('../src/servicesData');
        return technicans.find(tech => tech.key == key);
    };

    return (
        <BookingContext.Provider value={{
            bookingData,
            updateBooking,
            clearBooking,
            finServiceByKey,
            findTechnicianKey
        }}>
            {children}
        </BookingContext.Provider>
    );
};