const Doctor = require('../models/doctor.model');

const getDoctor = async () => {
    const doctors = await Doctor.find();
    return doctors;
}

const getDoctorById = async (id) => {
    const doctor = await Doctor.findById(id);
    return doctor;
}

const calculateAvailableSlots = (workingHours, appointments) => {
    const slots = [];
    const interval = 30; 

    const [startHour, startMinute] = workingHours.start.split(':').map(Number);
    const [endHour, endMinute] = workingHours.end.split(':').map(Number);

    let currentTime = new Date(1970, 0, 1, startHour, startMinute);
    const endTime = new Date(1970, 0, 1, endHour, endMinute);

    const initialMinutes = currentTime.getMinutes();
    if (initialMinutes % interval !== 0) {
        currentTime.setMinutes(interval * Math.ceil(initialMinutes / interval));
    }

    while (currentTime < endTime) {
        const slotStart = new Date(currentTime);
        const slotEnd = new Date(currentTime.getTime() + interval * 60000);

        // Check if the slot conflicts with existing appointments
        const isAvailable = !appointments.some(app => {
        const appStart = new Date(app.date);
        const appEnd = new Date(appStart.getTime() + app.duration * 60000);
        return slotStart < appEnd && slotEnd > appStart;
        });

        if (isAvailable) {
        slots.push(slotStart.toISOString());
        }

        currentTime = slotEnd;
    }

    return slots;
};

const addNewDoctor = async (name, workingHours) => {
    const newDoctor = new Doctor({ name, workingHours });
    await newDoctor.save();
    return newDoctor;
}



module.exports = {
    getDoctor,
    getDoctorById,
    calculateAvailableSlots,
    addNewDoctor,
}