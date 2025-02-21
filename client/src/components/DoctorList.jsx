import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const DoctorList = () => {
    const [doctors, setDoctors] = useState([]);
    const navigate = useNavigate();

useEffect(() => {
// Fetch doctors from the backend
axios.get('https://babysteps-appointment-system.onrender.com/doctors')
    .then(response => setDoctors(response.data))
    .catch(error => console.error(error));
}, []);

const handleDoctorSelect = (doctorId) => {
// Navigate to the calendar view for the selected doctor
navigate(`/doctor/${doctorId}/slots`);
};

    return (
        <div>
        <h2>Select a Doctor</h2>
        <Link to="/add-doctor">
        <button>Add New Doctor</button>
        </Link>
        <ul>
            {doctors.map(doctor => (
            <li key={doctor._id} onClick={() => handleDoctorSelect(doctor._id)}>
                {doctor.name}
            </li>
            ))}
        </ul>
        </div>
    );
};

export default DoctorList;