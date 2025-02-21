const express = require('express');
const router = express.Router();
const doctorController = require('../controllers/doctor.controller')


router.get('/', doctorController.getDoctor);
router.get('/:id/slots', doctorController.getSlots);
router.post('/', doctorController.addDoctor);


module.exports = router;