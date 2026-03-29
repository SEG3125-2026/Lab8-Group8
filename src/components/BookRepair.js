import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useBooking } from '../context/BookingContext';

function BookRepair() {
    const navigate = useNavigate();
    const { bookingData, updateBooking, findServiceByKey, findTechnicianByKey } = useBooking();

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
        setFormData(prev => ({ ...prev, [id]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        updateBooking(formData);
        navigate('/payment');
    };

    const handleCancel = () => {
        navigate('/');
    };

    return (
        <main className="page form-page">
            <h1 className="form-title">Repair Request Form:</h1>

            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <label htmlFor="customerName">Name:</label>
                    <input
                     type="text"
                     id="customerName"
                     value={formData.customerName}
                     onChange={handleChange}
                     required
                />
                </div>

                <div className="form-row">
                    <label htmlFor="customerEmail">Email:</label>
                    <input
                    type="email"
                    id="customerEmail"
                    value={formData.customerEmail}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="form-row">
                    <label htmlFor="customerPhone">Phone Number:</label>
                    <input
                    type="text"
                    id="customerPhone"
                    value={formData.customerPhone}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="form-row">
                    <label htmlFor="phoneBrand">Phone Brand:</label>
                    <input 
                    type="text"
                    id="phoneBrand"
                    value={formData.phoneBrand}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="form-row">
                    <label htmlFor="phoneModel">Phone Model:</label>
                    <input
                    type="text"
                    id="phoneModel"
                    value={formData.phoneModel}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="form-row">
                    <label>Repair Type:</label>
                    <span className="inline-value">
                        {selectedService ? selectedService.name : "Not selected"}
                    </span>
                </div>

                <div className="form-row">
                    <label>Technician:</label>
                    <span className="inline-value">
                        {selectedTech ? selectedTech.name : "Not selected"}
                    </span>
                </div>

                <div className="form-row">
                    <label htmlFor="dropOffDate">Drop-off Date:</label>
                    <input
                    type="date"
                    id="dropOffDate"
                    value={formData.dropOffDate}
                    onChange={handleChange}
                    required
                />
                </div>

                <div className="form-row">
                    <label htmlFor="issueDescription">(Optional) Describe Issue:</label>
                    <textarea
                    id="issueDescription"
                    value={formData.issueDescription}
                    onChange={handleChange}
                    ></textarea>
                </div>

                <div className="form-actions">
                    <button type="submit" className="primary-green">Submit</button>
                    <button type="button" className="primary-red" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </main>
    );
}
export default BookRepair