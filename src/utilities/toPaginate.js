const toPaginate = queryStringObject => {

    const { limit, page } = queryStringObject;

    // check if correct arguments was entered is in correct format
    // throw error if enter 0, negative numbers, or letters
    if (
        (Object.keys(queryStringObject).length > 1 &&
            limit &&
            (!Boolean(parseInt(limit)) || Math.sign(limit) === -1)) ||
        (Object.keys(queryStringObject).length > 1 &&
            page &&
            (!Boolean(parseInt(page)) || Math.sign(page) === -1))
    )
        return false


    // limit defaults to 20
    const searchLimit = limit
        ? parseInt(limit)
        : 20;


    // page defaults to 1 with 0 skip
    const searchPage = page
        ? parseInt(page)
        : 1;

    const searchSkip = page && page !== 1
        ? (page - 1) * searchLimit
        : 0;


    return {
        searchLimit,
        searchPage,
        searchSkip
    }
}

module.exports = toPaginate;