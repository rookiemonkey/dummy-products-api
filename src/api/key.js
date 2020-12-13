const { nanoid } = require('nanoid');
const ApiKey = require('../models/ApiKey');
const toHandleAsync = require('../utilities/toHandleAsync');
const toEmail = require('../utilities/toEmail');
const toEncrypt = require('../utilities/toEncrypt');

/**
 * !PATH: /api/v1/key
 * process and api key for a given email address on req.body
 */
const processAnApiKey = toHandleAsync(async (req, res, next) => {
    const { email } = req.body;

    const randomKey = nanoid();

    const randomKeyEncrypted = toEncrypt(randomKey)

    await ApiKey.create({ key: randomKeyEncrypted, email });

    await toEmail(email, 'Dummy Products API Key', `
        Here is your api key: ${randomKey}
    `)

    res.json({
        success: true,
        datatype: 'API KEY REQUEST',
    })
})

module.exports = {
    processAnApiKey,
}