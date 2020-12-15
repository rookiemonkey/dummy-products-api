const mongoose = require('mongoose');
const isEmail = require('validator/lib/isEmail');

const apiKeySchema = new mongoose.Schema({
    key: {
        type: String,
        required: [true, 'Key is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, `You've already signed up before`],
        validate(value) {
            if (!isEmail(value)) {
                throw new Error('Please provide a valid email');
            }
        },
    }
}, {
    timestamps: true
})

const ApiKey = mongoose.model("ApiKey", apiKeySchema)

module.exports = ApiKey;