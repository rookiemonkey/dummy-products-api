const rateLimit = require("express-rate-limit");

const apiLimit = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,  // 24 hours
    max: 400,                       // limit of each IP
    message: "Uh oh! You have reached the maximum api call (400 calls per day)",
    headers: true
});

module.exports = apiLimit;