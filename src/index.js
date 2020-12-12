// =============================================
// DEPENDENCIES
// =============================================
require('dotenv').config();
require('./models/__index')();
const express = require("express");
const app = express();
const morgan = require('morgan');
const chalk = require('chalk');
const bodyParser = require("body-parser");
const api = require('./api/_routes');
const toCatchErrors = require('./utilities/toCatchErrors');
const ErrorReponse = require('./utilities/classError');

app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json())

// mount the ErrorResponse object to every request
app.use((req, res, next) => {
    res.withError = ErrorReponse;
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate')
    next();
})


// =============================================
// ROUTE: all prefixed with '/api/v1'
// =============================================
app.use('/api/v1', api)



// =============================================
// ERROR HANDLER: catches all the errors via next(error)
// error should be an instance of ErrorResponse(Message, ResStatusCode)
// =============================================
app.use(toCatchErrors)



// =============================================
// SERVER
// =============================================
app.listen(process.env.PORT, () => {
    console.log(
        chalk.yellowBright(`[STATUS] SERVER HAS STARTED AT PORT ${process.env.PORT}`)
    );
});