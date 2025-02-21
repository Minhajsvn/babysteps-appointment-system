// appointmentRoutes.js
const express = require('express');
const appointmentController = require('../controllers/appointment.controller');

const router = express.Router();

// Create a new appointment
router.post('/', appointmentController.createAppointment);

// Get all appointments
router.get('/', appointmentController.getAppointment);

// Get appointments bt id
router.get('/:id', appointmentController.getAppointmentById);

// Update appointments
router.put('/:id', appointmentController.updateAppointment);

// delete appointments
router.delete('/:id', appointmentController.deleteAppointment);


module.exports = router;