const handleAsync = require('../utilities/toHandleAsync');
const Product = require('../models/Product');

/**
 * !PATH: /api/v1/products
 * returns all the available products
 */
const getAllProducts = handleAsync(async (req, res, next) => {

    const numOfProducts = await Product
        .find(req.filter)
        .count();

    const productsArray = await Product
        .find(req.filter)
        .select('-product_reviews -product_description -__v')
        .limit(req.searchLimit)
        .skip(req.searchSkip);

    const response = {
        success: true,
        datatype: 'ALL PRODUCTS',
        numOfResults: productsArray.length,
        lastPage: Math.ceil(numOfProducts / req.searchLimit),
        page: req.searchPage,
        data: productsArray
    }

    if (response.lastPage == 0)
        throw new res.withError(`No results found`, 404)

    if (response.page > response.lastPage)
        throw new res.withError(`You've reached the last page, LAST PAGE: ${response.lastPage}`, 404)

    res.json(response)
})


/**
 * !PATH: /api/v1/products/toprated
 * returns all the top rated products
 */
const getAllTopRated = handleAsync(async (req, res, next) => {

    const numOfProducts = await Product
        .find({ product_ratings: { $gte: 4, $lte: 5 } })
        .count();

    const allTopRatedProducts = await Product
        .find({ product_ratings: { $gte: 4, $lte: 5 } })
        .sort({ product_ratings: 'descending' })
        .select('-product_reviews -product_description -__v')
        .limit(req.searchLimit)
        .skip(req.searchSkip);

    const response = {
        success: true,
        datatype: "ALL TOP RATED PRODUCTS. Starting from the highest rating",
        numOfResults: allTopRatedProducts.length,
        lastPage: Math.ceil(numOfProducts / req.searchLimit),
        page: req.searchPage,
        data: allTopRatedProducts
    }

    if (response.lastPage == 0)
        throw new res.withError(`No results found`, 404)

    if (response.page > response.lastPage)
        throw new res.withError(`You've reached the last page, LAST PAGE: ${response.lastPage}`, 404)

    res.json(response)
})


/**
 * !PATH: /api/v1/products/topsales
 * returns all the top sales products
 */
const getAllTopSales = handleAsync(async (req, res, next) => {

    const numOfProducts = await Product
        .find({ product_sales: { $gte: 1000 } })
        .count();

    const allTopSalesProducts = await Product
        .find({ product_sales: { $gte: 1000 } })
        .sort({ product_sales: 'descending' })
        .select('-product_reviews -product_description -__v')
        .limit(req.searchLimit)
        .skip(req.searchSkip);

    const response = {
        success: true,
        datatype: "ALL TOP SALES PRODUCTS. Starting from the highest sales",
        numOfResults: allTopSalesProducts.length,
        lastPage: Math.ceil(numOfProducts / req.searchLimit),
        page: req.searchPage,
        data: allTopSalesProducts
    }

    if (response.lastPage == 0)
        throw new res.withError(`No results found`, 404)

    if (response.page > response.lastPage)
        throw new res.withError(`You've reached the last page, LAST PAGE: ${response.lastPage}`, 404)

    res.json(response)
})



/**
 * !PATH: /api/v1/products/search?term=
 * returns all the produces that is a match to the query 'term', checkFilters middleware
 */
const searchProducts = handleAsync(async (req, res, next) => {

    const numOfProducts = await Product
        .find(req.filter)
        .count();

    const foundProducts = await Product
        .find(req.filter)
        .select('-product_reviews -product_description -__v')
        .limit(req.searchLimit)
        .skip(req.searchSkip);

    const response = {
        success: true,
        datatype: "SEARCH QUERY",
        numOfResults: foundProducts.length,
        lastPage: Math.ceil(numOfProducts / req.searchLimit),
        page: req.searchPage,
        data: foundProducts
    }

    if (response.lastPage == 0)
        throw new res.withError(`No results found`, 404)

    if (response.page > response.lastPage)
        throw new res.withError(`You've reached the last page, LAST PAGE: ${response.lastPage}`, 404)

    res.json(response)
})


/**
 * !PATH: /api/v1/products/random?limit=num
 * returns num random products defaults to 20, handled by checkQuery middleware
 * if the limit exceeds 20, it will still return 20 products
 */
const randomProducts = handleAsync(async (req, res, next) => {

    // exclude description and reviews, match all since all ids exists
    const results = await Product
        .aggregate([
            { "$match": { _id: { $exists: true } } },
            { "$project": { product_description: 0, product_reviews: 0, __v: 0 } }
        ])
        .sample(req.searchLimit)

    const response = {
        success: true,
        datatype: 'RANDOM PRODUCTS',
        numOfResults: results.length,
        data: results
    }

    res.json(response)
})


/**
 * !PATH: /api/v1/products/:prodId?similarities=true
 * returns information about a product
 */
const getAProduct = handleAsync(async (req, res, next) => {
    const { similarities } = req.query;
    let response;

    const foundProduct = await Product
        .findById(req.params.prodId)
        .select('-__v')
        .populate("product_reviews")
        .exec()

    if (!foundProduct)
        throw new res.withError('Product not found', 404)

    if (!similarities || similarities != 'true')
        response = foundProduct;

    if (similarities && similarities == 'true') {
        const similarProducts = await Product
            .aggregate([
                {
                    "$match": {
                        _id: { $ne: foundProduct._id },
                        $or: [
                            { product_type: foundProduct.product_type },
                            { product_department: foundProduct.product_department }
                        ]
                    }
                },
                {
                    "$project": {
                        product_description: 0,
                        product_reviews: 0,
                        product_sales: 0,
                        product_color: 0,
                        product_material: 0,
                        __v: 0
                    }
                }
            ])
            .sample(5)

        const unfrozenDocument = foundProduct.toObject();
        unfrozenDocument.product_similar = similarProducts;
        response = unfrozenDocument;
    }

    res.json({
        success: true,
        datatype: 'A PRODUCT',
        data: response
    })
})


module.exports = {
    searchProducts,
    randomProducts,
    getAllProducts,
    getAllTopRated,
    getAllTopSales,
    getAProduct
}