import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

function BookRepair() {
  const navigate = useNavigate();
  const { bookingData, updateBooking, findServiceByKey, findTechnicianByKey, language } = useBooking();

  const text = {
    en: {
      title: 'Repair Request Form:',
      name: 'Name:',
      email: 'Email:',
      phoneNumber: 'Phone Number:',
      phoneBrand: 'Phone Brand:',
      phoneModel: 'Phone Model:',
      repairType: 'Repair Type:',
      technician: 'Technician:',
      notSelected: 'Not selected',
      dropOffDate: 'Drop-off Date:',
      describeIssue: '(Optional) Describe Issue:',
      submit: 'Submit',
      cancel: 'Cancel'
    },
    fr: {
      title: 'Formulaire de demande de réparation :',
      name: 'Nom :',
      email: 'Courriel :',
      phoneNumber: 'Numéro de téléphone :',
      phoneBrand: 'Marque du téléphone :',
      phoneModel: 'Modèle du téléphone :',
      repairType: 'Type de réparation :',
      technician: 'Technicien :',
      notSelected: 'Non sélectionné',
      dropOffDate: 'Date de dépôt :',
      describeIssue: '(Optionnel) Décrivez le problème :',
      submit: 'Soumettre',
      cancel: 'Annuler'
    }
  };

  const t = text[language];

  const [formData, setFormData] = useState({
    customerName: bookingData.customerName || '',
    customerEmail: bookingData.customerEmail || '',
    customerPhone: bookingData.customerPhone || '',
    phoneBrand: bookingData.phoneBrand || '',
    phoneModel: bookingData.phoneModel || '',
    dropOffDate: bookingData.dropOffDate || '',
    issueDescription: bookingData.issueDescription || ''
  });

  const selectedService = findServiceByKey(bookingData.serviceKey);
  const selectedTech = findTechnicianByKey(bookingData.technicianKey);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    updateBooking(formData);

    const payload = {
        ...formData,
        repairType: selectedService?.name[language] || null,
        technician: selectedTech?.name || null,
        basePrice: selectedService?.price || 0,
        totalPrice: selectedService?.price || 0
    };

    console.log("Sending data:", payload);

    try {
        const response = await fetch('http://localhost:4000/bookings', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) throw new Error('Network response was not ok');

        const data = await response.json();
        console.log("Saved ID:", data.id);

        navigate('/payment');
    } catch (error) {
        console.error(error);
        alert('Failed to save booking');
    }
};

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <main className="page form-page">
      <h1 className="form-title">{t.title}</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="customerName">{t.name}</label>
          <input type="text" id="customerName" value={formData.customerName} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label htmlFor="customerEmail">{t.email}</label>
          <input type="email" id="customerEmail" value={formData.customerEmail} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label htmlFor="customerPhone">{t.phoneNumber}</label>
          <input type="text" id="customerPhone" value={formData.customerPhone} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label htmlFor="phoneBrand">{t.phoneBrand}</label>
          <input type="text" id="phoneBrand" value={formData.phoneBrand} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label htmlFor="phoneModel">{t.phoneModel}</label>
          <input type="text" id="phoneModel" value={formData.phoneModel} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label>{t.repairType}</label>
          <span className="inline-value">
            {selectedService ? selectedService.name[language] : t.notSelected}
          </span>
        </div>

        <div className="form-row">
          <label>{t.technician}</label>
          <span className="inline-value">
            {selectedTech ? selectedTech.name : t.notSelected}
          </span>
        </div>

        <div className="form-row">
          <label htmlFor="dropOffDate">{t.dropOffDate}</label>
          <input type="date" id="dropOffDate" value={formData.dropOffDate} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <label htmlFor="issueDescription">{t.describeIssue}</label>
          <textarea id="issueDescription" value={formData.issueDescription} onChange={handleChange}></textarea>
        </div>

        <div className="form-actions">
          <button type="submit" className="primary-green">{t.submit}</button>
          <button type="button" className="primary-red" onClick={handleCancel}>
            {t.cancel}
          </button>
        </div>
      </form>
    </main>
  );
}

export default BookRepair;