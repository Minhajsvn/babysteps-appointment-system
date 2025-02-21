const appointmentService = require('../services/appointment.service');
const Appointment = require('../models/appointment.model');

// Get all appointments
const getAppointment = async (req, res) => {
    try {
        const appointments = await appointmentService.getAppointment();
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get appointment by id
const getAppointmentById = async (req, res) => {
    const { id } = req.params;

    try {
        const appointment = await appointmentService.getAppointmentById(id);
        res.json(appointment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// Get an appointment by doctor
const getAppointmentByDoctor = async (req, res) => {
        try {
            const appointment = await appointmentService.getAppointmentByDoctor();
            res.json(appointment);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
};

// Create an Appointment
const createAppointment = async (req, res) => {
    try {
        const newAppointment = await appointmentService.createAppointment(req.body);
        res.status(201).json(newAppointment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update appointment
const updateAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await appointmentService.updateAppointment(id, req.body);
        res.status(200).json(appointment);
    } catch (err) {
        if(err.message === 'Appointment not found') {
            return res.status(404).json({ message: err.message }); // Return 404 if appointment is missing
        }
        if (err.message === 'The requested time slot is not available') {
            return res.status(400).json({ message: err.message }); // Return 400 for invalid updates
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

// Delete appointment
const deleteAppointment = async (req, res) => {
    const { id } = req.params;
    try {
        const appointment = await appointmentService.deleteAppointment(id);
        res.status(200).json(appointment);
    } catch (err) {
        if (err.message === 'Appointment not found') {
            return res.status(404).json({ message: err.message }); // Return 404 if appointment not found
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
}





module.exports = {
    getAppointment,
    getAppointmentById,
    getAppointmentByDoctor,
    createAppointment,
    updateAppointment,
    deleteAppointment,
}