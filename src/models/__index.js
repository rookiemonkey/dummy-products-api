const mongoose = require('mongoose');
const chalk = require('chalk');

// connect to the database
mongoose.connect(
    process.env.MONGODB_URL,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    }
)

// check mongoose connection
mongoose.connection.on("open", () => {
    console.log(
        chalk.yellowBright(`[STATUS] CONNECTED TO THE DATABASE`)
    )
})

mongoose.connection.on("error", () => {
    console.log(
        chalk.redBright(`[STATUS] FAILED TO CONNECT TO THE DATABASE`)
    )
})

// bring in the models
module.exports.Review = require("./Review");
module.exports.Product = require('./Product');