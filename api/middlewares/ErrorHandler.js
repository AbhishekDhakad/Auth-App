const ErrorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Something went wrong";
    res.status(statusCode).json({
        success: false,
        status: statusCode,
        message,
        stack: process.env.NODE_ENV === 'development' ? err.stack : {}
    })
}

export const CustomErrorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message;
    return error;
}

export default ErrorHandler;