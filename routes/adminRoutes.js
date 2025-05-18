const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const protect = require('../middleware/authMiddleware');
const validate = require('../utils/validateRequest');
const { loginValidator, resetPasswordValidator } = require('../validations/adminValidation');

router.post('/login', validate(loginValidator), adminController.loginAdmin);
router.post('/reset-password', validate(resetPasswordValidator), adminController.resetPassword);
router.get('/dashboard-details', protect, adminController.getDashboard);

module.exports = router;
