
/**
 * a custom error class for response
 */

class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode
        this.name = 'ErrorResponse'
    }
}

module.exports = ErrorResponse;