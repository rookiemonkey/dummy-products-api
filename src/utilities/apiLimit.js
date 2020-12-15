const rateLimit = require("express-rate-limit");

// limit for main routes
const limitMainRoutes = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,  // 24 hours
    max: 400,                       // limit of each IP
    message: "Uh oh! You have reached the maximum api call (400 calls per day)",
    headers: true
});

// limit for apiKeyRequest
const limitApiKeyRoute = rateLimit({
    windowMs: 24 * 60 * 60 * 1000,  // 24 hours
    max: 1,                       // limit of each IP
    message: "Uh oh! You have reached the maximum api call (1 API Key request per day)",
    headers: true
});

module.exports = {
    limitMainRoutes,
    limitApiKeyRoute
};