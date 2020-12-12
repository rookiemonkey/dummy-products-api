const handleAsync = require('../utilities/toHandleAsync');
const Product = require('../models/Product');

/**
 * !PATH: /api/dummyproducts/products
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
 * !PATH: /api/dummyproducts/products/prodId
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
    getAProduct
}