// routes/leadRoutes.js
const express = require('express');
const router = express.Router();
const leadController = require('../controllers/leadsController');
const protect = require('../middleware/authMiddleware');
const validateRequest = require('../utils/validateRequest');
const { contactUsValidator } = require('../validations/leadValidation');

// Public
router.post('/contact-us',validateRequest(contactUsValidator), leadController.contactUs);

// Authenticated
router.get('/leads', protect, leadController.getAllLeads);
router.get('/leads/priority', protect, leadController.getPriorityLeads);
router.get('/leads/converted', protect, leadController.getConvertedLeads);
router.get('/leads/archived', protect, leadController.getArchivedLeads);

router.patch('/leads/:id/priority', protect, leadController.updatePriority);
router.patch('/leads/:id/status', protect, leadController.updateStatus);
router.patch('/leads/:id/reminder', protect, leadController.setReminder);

router.delete('/leads/:id', protect, leadController.deleteLead);

module.exports = router;
