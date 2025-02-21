import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const CalendarView = () => {
    const { doctorId } = useParams();
    const [slots, setSlots] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const navigate = useNavigate();

    useEffect(() => {
    const fetchSlots = async () => {
        try {
            const dateString = selectedDate.toISOString().split('T')[0]; // UTC date
            const response = await axios.get(
                `http://localhost:5000/doctors/${doctorId}/slots?date=${dateString}`
            );
            setSlots(response.data);
        } catch (error) {
            console.error(error);
        }
        };
        fetchSlots();
    }, [doctorId, selectedDate]);


    const handleSlotSelect = (slot) => {
        // Navigate to the appointment booking form with the selected slot
        navigate(`/book/${doctorId}/${slot}`);
    };

    return (
        <div>
        <h2>Available Slots</h2>
        <DatePicker
            selected={selectedDate}
            onChange={(newDate) => setSelectedDate(newDate)}
            dateFormat="yyyy-MM-dd"
        />
        <ul>
            {slots.map((slot, index) => (
                <button
                    key={index}
                    onClick={() => handleSlotSelect(slot)}
                    style={{ margin: '5px' }}
                >
                    {new Date(slot).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                    })}
                </button>
            ))}
        </ul>
        </div>
    );
};

export default CalendarView;