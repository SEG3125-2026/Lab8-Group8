import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

function Payment() {
    const navigate = useNavigate();
    const { bookingData, clearBooking, findServiceByKey, findTechnicianByKey } = useBooking();

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        expiryDate: '',
        cvv: ''
    });

    const selectedService = findServiceByKey(bookingData.serviceKey);
    const selectedTech = findTechnicianByKey(bookingData.technicianKey);
    
    // Account for base and price with tax
    const basePrice = selectedService ? selectedService.price : 0;
    const totalPrice = Math.round(basePrice * 1.13);

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString + "T00:00:00");
        if (isNaN(date.getTime())) return dateString;
        return date.toLocaleDateString("en-CA", {
            year: "numeric",
            month: "long",
            day: "numeric"
        });
    };

    const handleChange = (e) => {
        const { id, value } = e.target;
        setPaymentDetails(prev => ({ ...prev, [id]: value }));
    };

    const handleConfirm = (e) => { 
        e.preventDefault();
        alert("Repair booking and payment confirmed");
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
                    <h2>Repair Summary:</h2>
                    <p>Phone Brand: {bookingData.phoneBrand || ""}</p>
                    <p>Phone Model: {bookingData.phoneModel || ""}</p>
                    <p>Technician: {selectedTech ? selectedTech.name : ""}</p>
                    <p>Repair: {selectedService ? selectedService.name : ""}</p>
                    <p>Date: {formatDateForDisplay(bookingData.dropOffDate) || ""}</p>
                    <br />
                    <p>Price: ${basePrice}</p>
                    <p>Total Price: ${totalPrice}</p>
                </section>

                <section className="payment-method">
                    <h2>Payment Method:</h2>

                    <form onSubmit={handleConfirm}>
                        <div className="form-row">
                            <label htmlFor="cardNumber">Card Number:</label>
                            <input
                            type="text"
                            id="cardNumber"
                            value={paymentDetails.cardNumber}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="form-row">
                            <label htmlFor="expiryDate">Expiry Date:</label>
                            <input
                            type="text"
                            id="expiryDate"
                            value={paymentDetails.expiryDate}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="form-row">
                            <label htmlFor="cvv">CVV:</label>
                            <input
                            type="text"
                            id="cvv"
                            value={paymentDetails.cvv}
                            onChange={handleChange}
                            required
                        />
                        </div>

                        <div className="payment-actions">
                            <button type="submit" className="primary-green">Confirm</button>
                            <button type="button" className="primary-red" onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
}
export default Payment;