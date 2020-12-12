const handleAsync = require('../utilities/toHandleAsync');
const Product = require('../models/Product');

/**
 * !PATH: /api/v1/products
 * returns all the available products
 */
const getAllProducts = handleAsync(async (req, res, next) => {
    const productsArray = await Product.find({});

    res.json({
        success: true,
        datatype: 'ALL PRODUCTS',
        numOfResults: productsArray.length,
        data: productsArray
    })
})


/**
 * !PATH: /api/v1/products/toprated
 * returns all the top rated products
 */
const getAllTopRated = handleAsync(async (req, res, next) => {
    const allTopRatedProducts = await Product
        .find({ product_ratings: { $gte: 4, $lte: 5 } })
        .sort({ product_ratings: 'descending' })
        .limit(10);

    res.json({
        success: true,
        datatype: "ALL TOP RATED PRODUCTS. Starting from the highest rating",
        numOfResults: allTopRatedProducts.length,
        data: allTopRatedProducts
    })
})


/**
 * !PATH: /api/v1/products/topsales
 * returns all the top sales products
 */
const getAllTopSales = handleAsync(async (req, res, next) => {
    const allTopSalesProducts = await Product
        .find({ product_sales: { $gte: 1000 } })
        .sort({ product_sales: 'descending' })
        .limit(10);

    res.json({
        success: true,
        datatype: "ALL TOP SALES PRODUCTS. Starting from the highest sales",
        numOfResults: allTopSalesProducts.length,
        data: allTopSalesProducts
    })
})


/**
 * !PATH: /api/v1/products/:prodId
 * returns information about a product
 */
const getAProduct = handleAsync(async (req, res, next) => {
    const foundProduct = await Product.findById(req.params.prodId);

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