// =============================================
// DEPENDENCIES
// =============================================
require('dotenv').config();
require('./src/models/_index')();
const express = require("express");
const app = express();
const morgan = require('morgan');
const chalk = require('chalk');
const bodyParser = require("body-parser");
const toCatchErrors = require('./src/utilities/toCatchErrors');
const ErrorReponse = require('./src/utilities/customErrorClass');

app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

// mount the ErrorResponse object to every request
app.use((req, res, next) => {
    res.withError = ErrorReponse;
    next();
})

// =============================================
// ERROR HANDLER: catches all the errors via next(error)
// error should be an instance of ErrorResponse(Message, ResStatusCode)
// =============================================
app.use(toCatchErrors)



// =============================================
// SERVER
// =============================================
app.listen(process.env.API_PORT, () => {
    console.log(
        chalk.yellowBright(`[STATUS] SERVER HAS STARTED AT PORT ${process.env.API_PORT}`)
    );
});