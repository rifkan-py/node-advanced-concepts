function errorHandler(error, req, res, next) {
    const errorCode = res.statusCode || 500;
    const message = error.message || "Internal server error."

    res.status(errorCode).json({
        errorCode,
        message,
        stack: process.env.NODE_ENV === "development" ? error.stack : null
    })
}

module.exports = errorHandler