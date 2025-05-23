// index.js
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const path = require('path');
const errorMiddleware = require("../middleware/errorMiddleware");
const connectDB = require('../config/database');
const authRoutes = require("../routes/authRoutes");
const leadRoutes = require("../routes/leadsRoutes");
const blogRoutes = require("../routes/blogsRoutes");

connectDB();

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// Serve public folder
app.use(express.static(path.join(__dirname, 'public', )));

// Default route
// Serve index.html when '/' is accessed
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Auth Route
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/leads', leadRoutes);
app.use('/api/v1/blogs', blogRoutes);

// Error middleware
app.use(errorMiddleware);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
