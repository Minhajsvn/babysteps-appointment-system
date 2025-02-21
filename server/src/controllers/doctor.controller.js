const doctorService = require('../services/doctor.service')
const appointmentService = require('../services/appointment.service');

// Get all doctors
const getDoctor = async (req, res) => {
        try {
            const doctors = await doctorService.getDoctor();
            res.json(doctors);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
};


// Get available slots for a doctor on a specific date
const getSlots = async (req, res) => {
    const { id } = req.params;
    const { date } = req.query;

    try {
        const doctor = await doctorService.getDoctorById(id);
        const appointments = await appointmentService.getAppointmentByDoctor(id, date);
        const slots = doctorService.calculateAvailableSlots(doctor.workingHours, appointments);
        res.json(slots);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

const addDoctor = async (req, res) => {
    const { name, workingHours } = req.body;

    try {
        const newDoctor = await doctorService.addNewDoctor(name, workingHours);
        res.status(201).json(newDoctor);
    } catch (error) {
        res.status(400).json({ message: err.message });
    }
}

module.exports = {
    getDoctor,
    getSlots,
    addDoctor
}