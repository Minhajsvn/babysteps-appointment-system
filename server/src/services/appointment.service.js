const Appointment = require('../models/appointment.model');

const getAppointment = async () => {
    const appointments = await Appointment.find();
    return appointments;
}

const getAppointmentById = async (id) => {
    const appointments = await Appointment.findById(id);
    if (!appointment) {
        throw new Error("Appointment not found"); // Handle not found cases
    }
    return appointments;
}

const getAppointmentByDoctor = async (id, date) => {
    const startDate = new Date(date);
    const endDate = new Date(startDate.getTime() + 1440 * 60000);
    return await Appointment.find({ doctorId: id, date: { $gte: startDate, $lt: endDate } });
}

const createAppointment = async (body) => {
    const { doctorId, date, duration, appointmentType, patientName, notes } = body;

    if (!doctorId || !date || !duration || !appointmentType || !patientName) {
        throw new Error("Missing required fields");
    }
    const newAppointment = new Appointment({ doctorId, date, duration, appointmentType, patientName, notes });
    await newAppointment.save();
    
    return newAppointment;
} 

const updateAppointment = async (id, body) => {
    const { doctorId, date, duration, appointmentType, patientName, notes } = body;

        // Check if the appointment exists
        const appointment = await Appointment.findById(id);
        if (!appointment) {
            throw new Error('Appointment not found');
        }

        // Convert date to a valid Date object
        const appointmentStart = new Date(date);
        const appointmentEnd = new Date(appointmentStart.getTime() + duration * 60000);
    
        // Check if the new time slot is available
        const existingAppointments = await Appointment.find({
            doctorId,
            date: { $gte: appointmentStart, $lt: appointmentEnd },
            _id: { $ne: id } // Exclude the current appointment from the check
            });
    
        if (existingAppointments.length > 0) {
            throw new Error('The requested time slot is not available');
        }
    
        // Update the appointment
        appointment.doctorId = doctorId;
        appointment.date = date;
        appointment.duration = duration;
        appointment.appointmentType = appointmentType;
        appointment.patientName = patientName;
        appointment.notes = notes;
    
        await appointment.save();
        return appointment;
}

const deleteAppointment = async (id) => {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
        throw new Error('Appointment not found');
    }
    return { message: 'Appointment deleted successfully' };
}


module.exports = {
    getAppointment,
    getAppointmentById,
    createAppointment,
    getAppointmentByDoctor,
    updateAppointment,
    deleteAppointment
}