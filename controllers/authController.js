
const connectDB = require('../config/database');
const user = require('../models/user');
const generateToken = require('../utils/genrateToken');


exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // create a user with email and password
        const admin = await user.findOne({ email });
        console.log(admin);
        if (!admin || !(await admin.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({
            success:true,
            token: generateToken(admin._id),
            user: { id: admin._id, email: admin.email }
        });
    } catch (err) {
        next(err);
    }
};

exports.resetPassword = async (req, res, next) => {
    try {
        const { email, newPassword } = req.body;
        const admin = await user.findOne({ email });
        if (!admin) return res.status(404).json({ message: 'Admin not found' });

        admin.password = newPassword;
        await admin.save();

        res.status(200).json({ message: 'Password reset successfully' });
    } catch (err) {
        next(err);
    }
};

