const handleAsync = require('../utilities/toHandleAsync');
const toPaginate = require('../utilities/toPaginate');
const Product = require('../models/Product');

/**
 * !PATH: /api/v1/products
 * returns all the available products
 */
const getAllProducts = handleAsync(async (req, res, next) => {

    const pagination = toPaginate(req.query)

    if (!pagination)
        throw new res.withError('Please enter a valid argument for the filters', 400)

    const productsArray = await Product
        .find({})
        .select('-product_reviews -product_description')
        .limit(pagination.searchLimit)
        .skip(pagination.searchSkip);

    res.json({
        success: true,
        datatype: 'ALL PRODUCTS',
        numOfResults: productsArray.length,
        page: pagination.searchPage,
        data: productsArray
    })
})


/**
 * !PATH: /api/v1/products/toprated
 * returns all the top rated products
 */
const getAllTopRated = handleAsync(async (req, res, next) => {

    const pagination = toPaginate(req.query)

    if (!pagination)
        throw new res.withError('Please enter a valid argument for the filters', 400)

    const allTopRatedProducts = await Product
        .find({ product_ratings: { $gte: 4, $lte: 5 } })
        .sort({ product_ratings: 'descending' })
        .select('-product_reviews -product_description')
        .limit(pagination.searchLimit)
        .skip(pagination.searchSkip);

    res.json({
        success: true,
        datatype: "ALL TOP RATED PRODUCTS. Starting from the highest rating",
        numOfResults: allTopRatedProducts.length,
        page: pagination.searchPage,
        data: allTopRatedProducts
    })
})


/**
 * !PATH: /api/v1/products/topsales
 * returns all the top sales products
 */
const getAllTopSales = handleAsync(async (req, res, next) => {

    const pagination = toPaginate(req.query)

    if (!pagination)
        throw new res.withError('Please enter a valid argument for the filters', 400)

    const allTopSalesProducts = await Product
        .find({ product_sales: { $gte: 1000 } })
        .sort({ product_sales: 'descending' })
        .select('-product_reviews -product_description')
        .limit(pagination.searchLimit)
        .skip(pagination.searchSkip);

    res.json({
        success: true,
        datatype: "ALL TOP SALES PRODUCTS. Starting from the highest sales",
        numOfResults: allTopSalesProducts.length,
        page: pagination.searchPage,
        data: allTopSalesProducts
    })
})


/**
 * !PATH: /api/v1/products/:prodId
 * returns information about a product
 */
const getAProduct = handleAsync(async (req, res, next) => {
    const foundProduct = await Product
        .findById(req.params.prodId)
        .populate("product_reviews")
        .exec()

    if (!foundProduct)
        throw new res.withError('Product not found', 404)

    res.json({
        success: true,
        datatype: 'A PRODUCT',
        data: foundProduct
    })
})

module.exports = {
    getAllProducts,
    getAllTopRated,
    getAllTopSales,
    getAProduct
}