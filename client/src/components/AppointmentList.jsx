import { useEffect, useState } from 'react';
import axios from 'axios';

const AppointmentList = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        // Fetch all appointments
        axios.get('http://localhost:5000/appointments')
        .then(response => setAppointments(response.data))
        .catch(error => console.error(error));
    }, []);

    return (
        <div>
        <h2>Upcoming Appointments</h2>
        <ul>
            {appointments.map(appointment => (
            <li key={appointment._id}>
                <p>Patient: {appointment.patientName}</p>
                <p>Type: {appointment.appointmentType}</p>
                <p>Date: {new Date(appointment.date).toLocaleString()}</p>
            </li>
            ))}
        </ul>
        </div>
    );
};

export default AppointmentList;