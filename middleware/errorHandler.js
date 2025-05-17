const logger = require("../utils/logger");

const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    logger.error(err.message, { stack: err.stack });
    res.status(err.statusCode || 500).json({
        status: err.statusCode || 500,
        success: false,
        message: err.message || "Internal Server Error",
    });
};

module.exports = errorHandler;