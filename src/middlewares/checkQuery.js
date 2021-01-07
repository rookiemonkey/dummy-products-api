const checkQuery = (req, res, next) => {

    const { limit, page } = req.query;

    if (
        (limit && (!Boolean(parseInt(limit)) || Math.sign(limit) === -1)) ||
        (page && (!Boolean(parseInt(page)) || Math.sign(page) === -1))
    )
        throw new res.withError('Please enter a valid values for the page/limit', 400)

    // limit defaults to 20
    const searchLimit = limit
        ? parseInt(limit)
        : 20;


    // page defaults to 1 with 0 skip
    const searchPage = page
        ? parseInt(page)
        : 1;

    // skip relies on pageNum and the limit
    const searchSkip = page && page !== 1
        ? (page - 1) * searchLimit
        : 0;


    // appended needed data to req for the next handler
    req.searchLimit = searchLimit;
    req.searchPage = searchPage;
    req.searchSkip = searchSkip;


    // for RANDOM PRODUCTS route, max num results should only be 20
    if (req.route.path == '/products/random' && searchLimit > 20)
        req.searchLimit = 20

    next()
}

module.exports = checkQuery;