import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddDoctorForm = () => {
    const [name, setName] = useState('');
    const [workingHours, setWorkingHours] = useState({ start: '', end: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newDoctor = {
            name,
            workingHours,
        };

        try {
            await axios.post('http://localhost:8082/doctors', newDoctor);
            alert('Doctor added successfully!');
            navigate('/'); 
        } catch (error) {
            console.error(error);
            alert('Failed to add doctor');
        }
    };

    return (
        <div>
            <h2>Add a New Doctor</h2>
            <form onSubmit={handleSubmit}>
                <div>
                <label>Doctor Name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
                </div>
                <div>
                <label>Working Hours (Start):</label>
                <input
                    type="time"
                    value={workingHours.start}
                    onChange={(e) => setWorkingHours({ ...workingHours, start: e.target.value })}
                    required
                />
                </div>
                <div>
                <label>Working Hours (End):</label>
                <input
                    type="time"
                    value={workingHours.end}
                    onChange={(e) => setWorkingHours({ ...workingHours, end: e.target.value })}
                    required
                />
                </div>
                <button type="submit">Add Doctor</button>
            </form>
        </div>
    );
};

export default AddDoctorForm;