const express = require('express');
const appointmentRoute = require('./appointment.route')
const doctorRoute = require('./doctor.route');

const router = express.Router();

router.use("/appointment", appointmentRoute);
router.use('/doctors', doctorRoute);


module.exports = router;