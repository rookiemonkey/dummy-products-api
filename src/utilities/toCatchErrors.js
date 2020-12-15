const chalk = require('chalk');

/**
 * A utility function/middlware to catch all the thrown errors
 */

const toCatchErrors = (error, req, res, next) => {
    const errorResponse = {}

    switch (true) {

        // Custom error created w/ customErrorClass
        case error.name === 'ErrorResponse':
            errorResponse.message = error.message;
            errorResponse.status = error.statusCode;
            break;

        // Mongo Incorrect id Error
        case error.name === 'CastError':
            errorResponse.message = `Resource not found`;
            errorResponse.status = 404;
            break;

        // Mongo Duplicate Key Error
        case error.code === 11000:
            errorResponse.message = `Resource already exists`;
            errorResponse.status = 400;
            break;

        // Mongo Validation Error
        case error.name === 'ValidationError':
            const message = Object.keys(error.errors).map(field => field);
            errorResponse.message = `The following fields are required: ${message}`;
            errorResponse.status = 400;
            break;

        // Log any undocumented errors
        default:
            process.env.NODE_ENV === 'development'
                ? console.log(chalk.red('[WARNING!]: An undocumented error occured \n'), error)
                : null

    }

    const response = {
        success: false,
        message: `${errorResponse.message}` || `An undocumented error occured`
    }

    res
        .status(errorResponse.status || 500)
        .json(response);
}

module.exports = toCatchErrors;