const handleAsync = require('../utilities/toHandleAsync');
const Product = require('../models/Product');

/**
 * !PATH: /api/dummyproducts/products
 * returns all the available product departments
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

module.exports = {
    getAllProducts
}