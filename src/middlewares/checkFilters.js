const toHandleAsync = require('../utilities/toHandleAsync');
const toMatchAll = require('../utilities/toMatchAll');

// keys will be the query string key
const validQueryFilters = {
    stocks: 'product_stock',
    sales: 'product_sales',
    price: 'product_price',
    ratings: 'product_ratings'
}

// one of the values of the key above, key/value separated by _
// multiple operators will be separated by ^
// eg: lt_5^gt_5   means: less than 5 and greater than 5
const validQueryOperators = [
    'gt', 'gte', 'lt', 'lte'
]

const checkFilter = toHandleAsync((req, res, next) => {
    const filter = new Object();

    const queryKeys = Object.keys(req.query);
    const validFilters = Object.keys(validQueryFilters);

    queryKeys.forEach(key => {
        const isValid = validFilters
            .some(filter => filter == key)

        // dont throw an error for invalid filter since we have apikey as well
        if (isValid) {

            const prop = validQueryFilters[key]
            filter[prop] = new Object();

            // extract the qstring value and separated by ^
            // this allows chaining of 2 operators eg: lt_5-gt_5
            const queryValue = req.query[key]
            const arrOfValues = queryValue.split('^')

            // loop thru array of value separated before by -
            arrOfValues.forEach(value => {

                // form the key/value pair for each operator
                const parsed = value.split('_')
                const [qKey, qValue] = parsed;

                // if operator is incorrect, throw an error right away
                if (!validQueryOperators.includes(qKey))
                    throw new res.withError("Please provide the correct filter operators either 'gt', 'gte', 'lt', or 'lte'", 400)

                filter[prop][`$${qKey}`] = parseFloat(qValue)

            })
        }
    })

    // append product_name to search if the user used the 'search route
    if (req.route.path === '/products/search') {

        if (!req.query.term)
            throw new res.withError('Please provide your search term &term=value', 400)

        filter.product_name = new RegExp(toMatchAll(req.query.term), 'gi')
    }

    // appended needed filter to the next handler
    req.filter = filter
    next()
})

module.exports = checkFilter;