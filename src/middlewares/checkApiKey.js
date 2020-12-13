const ApiKey = require('../models/ApiKey');
const toHandleAsync = require('../utilities/toHandleAsync');
const toEncrypt = require('../utilities/toEncrypt');

const checkApiKey = toHandleAsync(async (req, res, next) => {
    const { apikey } = req.query;

    if (!apikey) throw new res.withError('Please provide a valid API key', 400)

    const encryptedKeyQuery = toEncrypt(apikey);

    const foundKey = await ApiKey.findOne({ key: encryptedKeyQuery })

    if (!foundKey) throw new res.withError('Please provide a valid API key', 400)

    next()
})

module.exports = checkApiKey;