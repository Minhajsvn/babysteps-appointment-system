import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import DoctorList from './components/DoctorList';
import CalendarView from './components/CalendarView';
import AppointmentForm from './components/AppointmentForm';
import AppointmentList from './components/AppointmentList';
import AddDoctorForm from './components/AddDoctorForm';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DoctorList />} />
        <Route path="/doctor/:doctorId/slots" element={<CalendarView />} />
        <Route path="/book/:doctorId/:slot" element={<AppointmentForm />} />
        <Route path="/appointments" element={<AppointmentList />} />
        <Route path="/add-doctor" element={<AddDoctorForm />} />
      </Routes>
    </Router>
  );
};

export default App;