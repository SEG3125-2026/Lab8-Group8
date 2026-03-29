import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

function Payment() {
  const navigate = useNavigate();
  const { bookingData, clearBooking, findServiceByKey, findTechnicianByKey, language } = useBooking();

  const text = {
    en: {
      repairSummary: 'Repair Summary:',
      phoneBrand: 'Phone Brand:',
      phoneModel: 'Phone Model:',
      technician: 'Technician:',
      repair: 'Repair:',
      date: 'Date:',
      price: 'Price:',
      totalPrice: 'Total Price:',
      paymentMethod: 'Payment Method:',
      cardNumber: 'Card Number:',
      expiryDate: 'Expiry Date:',
      cvv: 'CVV:',
      confirm: 'Confirm',
      cancel: 'Cancel',
      confirmedAlert: 'Repair booking and payment confirmed'
    },
    fr: {
      repairSummary: 'Résumé de la réparation :',
      phoneBrand: 'Marque du téléphone :',
      phoneModel: 'Modèle du téléphone :',
      technician: 'Technicien :',
      repair: 'Réparation :',
      date: 'Date :',
      price: 'Prix :',
      totalPrice: 'Prix total :',
      paymentMethod: 'Méthode de paiement :',
      cardNumber: 'Numéro de carte :',
      expiryDate: 'Date d’expiration :',
      cvv: 'CVV :',
      confirm: 'Confirmer',
      cancel: 'Annuler',
      confirmedAlert: 'Réservation de réparation et paiement confirmés'
    }
  };

  const t = text[language];

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });

  const selectedService = findServiceByKey(bookingData.serviceKey);
  const selectedTech = findTechnicianByKey(bookingData.technicianKey);

  const basePrice = selectedService ? selectedService.price : 0;
  const totalPrice = Math.round(basePrice * 1.13);

  const formatDateForDisplay = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    if (isNaN(date.getTime())) return dateString;

    return date.toLocaleDateString(language === 'fr' ? 'fr-CA' : 'en-CA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setPaymentDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    alert(t.confirmedAlert);
    clearBooking();
    navigate('/');
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <main className="page">
      <div className="payment-layout">
        <section className="payment-summary">
          <h2>{t.repairSummary}</h2>
          <p>{t.phoneBrand} {bookingData.phoneBrand || ''}</p>
          <p>{t.phoneModel} {bookingData.phoneModel || ''}</p>
          <p>{t.technician} {selectedTech ? selectedTech.name : ''}</p>
          <p>{t.repair} {selectedService ? selectedService.name[language] : ''}</p>
          <p>{t.date} {formatDateForDisplay(bookingData.dropOffDate) || ''}</p>
          <br />
          <p>{t.price} ${basePrice}</p>
          <p>{t.totalPrice} ${totalPrice}</p>
        </section>

        <section className="payment-method">
          <h2>{t.paymentMethod}</h2>

          <form onSubmit={handleConfirm}>
            <div className="form-row">
              <label htmlFor="cardNumber">{t.cardNumber}</label>
              <input type="text" id="cardNumber" value={paymentDetails.cardNumber} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <label htmlFor="expiryDate">{t.expiryDate}</label>
              <input type="text" id="expiryDate" value={paymentDetails.expiryDate} onChange={handleChange} required />
            </div>

            <div className="form-row">
              <label htmlFor="cvv">{t.cvv}</label>
              <input type="text" id="cvv" value={paymentDetails.cvv} onChange={handleChange} required />
            </div>

            <div className="payment-actions">
              <button type="submit" className="primary-green">{t.confirm}</button>
              <button type="button" className="primary-red" onClick={handleCancel}>
                {t.cancel}
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}

export default Payment;