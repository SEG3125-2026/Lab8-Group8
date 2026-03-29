import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { services, technicians } from '../data/servicesData';

const STORAGE_KEY = 'repairBooking';
const LANGUAGE_KEY = 'siteLanguage';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
<<<<<<< HEAD:rideau-repairs/src/context/BookingContext.js
  const [bookingData, setBookingData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : {};
    } catch (e) {
      return {};
    }
  });
=======
    const [bookingData, setBookingData] = useState(() => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            return {};
        }
    });
>>>>>>> 1b6f41d13e7d49a4a2c21fd7ac49434b1e3a6427:src/context/BookingContext.js

  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem(LANGUAGE_KEY) || 'en';
    } catch (e) {
      return 'en';
    }
  });

<<<<<<< HEAD:rideau-repairs/src/context/BookingContext.js
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(bookingData));
  }, [bookingData]);
=======
    const updateBooking = (data) => {
        setBookingData(prev => ({ ...prev, ...data }));
    };
>>>>>>> 1b6f41d13e7d49a4a2c21fd7ac49434b1e3a6427:src/context/BookingContext.js

  useEffect(() => {
    localStorage.setItem(LANGUAGE_KEY, language);
  }, [language]);

<<<<<<< HEAD:rideau-repairs/src/context/BookingContext.js
  const updateBooking = useCallback((data) => {
    setBookingData((prev) => ({ ...prev, ...data }));
  }, []);

  const clearBooking = () => {
    setBookingData({});
    localStorage.removeItem(STORAGE_KEY);
  };

  const findServiceByKey = (key) => {
    return services.find((service) => service.key === key);
  };

  const findTechnicianByKey = (key) => {
    return technicians.find((tech) => tech.key === key);
  };

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'en' ? 'fr' : 'en'));
  };

  return (
    <BookingContext.Provider
      value={{
        bookingData,
        updateBooking,
        clearBooking,
        findServiceByKey,
        findTechnicianByKey,
        language,
        setLanguage,
        toggleLanguage
      }}
    >
      {children}
    </BookingContext.Provider>
  );
=======
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
>>>>>>> 1b6f41d13e7d49a4a2c21fd7ac49434b1e3a6427:src/context/BookingContext.js
};