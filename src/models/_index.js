const mongoose = require('mongoose');
const chalk = require('chalk');

const connectDatabase = async () => {
    await mongoose.connect(process.env.API_DBURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    });

    console.log(
        chalk.yellowBright(`[STATUS] CONNECTED TO THE DATABASE`)
    );
};

module.exports = connectDatabase;