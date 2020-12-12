
/**
 * A utility function to prevent repetitive try-catch block
 * @param {*} asyncFn: an asynchronous function
 */

const toHandleAsync = asyncFn =>
    (req, res, next) => Promise
        .resolve(asyncFn(req, res, next))
        .catch(next);

module.exports = toHandleAsync;