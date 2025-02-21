import { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const AppointmentForm = () => {
    const { doctorId, slot } = useParams();
    const [patientName, setPatientName] = useState('');
    const [appointmentType, setAppointmentType] = useState('');
    const [notes, setNotes] = useState('');
    const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const dateString = new Date(slot).toISOString().split('T')[0];
        const response = await axios.get(
        `http://localhost:5000/doctors/${doctorId}/slots?date=${dateString}`
        );
        const isSlotAvailable = response.data.includes(slot);

        if (!isSlotAvailable) {
        alert('This slot is no longer available. Please select another.');
        return;
        }

        // Proceed to book the appointment
        await axios.post('http://localhost:5000/appointments', {
        doctorId,
        date: slot,
        duration: 30,
        appointmentType,
        patientName,
        notes,
        });
        navigate('/appointments');
    } catch (error) {
        console.error(error);
        alert('Booking failed. Please try again.');
    }
};

    return (
        <div>
        <h2>Book Appointment</h2>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Patient Name:</label>
                <input
                    type="text"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Appointment Type:</label>
                <input
                    type="text"
                    value={appointmentType}
                    onChange={(e) => setAppointmentType(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Notes:</label>
                <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
            </div>
            <button type="submit">Book Appointment</button>
        </form>
        </div>
    );
};

export default AppointmentForm;