const handleAsync = require('../utilities/toHandleAsync');
const Product = require('../models/Product');

/**
 * !PATH: /api/v1/action/checkout
 * emulates checkout and returns an object of the transaction
 * nothing is inserted on the database
 */
const checkout = handleAsync(async (req, res, next) => {
    const { items } = req.body;
    const date = new Date();
    const bought = new Array();
    let total = 0;

    for (let i = 0; i < items.length; i++) {
        const foundItem = await Product
            .findById(items[i])
            .select(`-product_reviews -product_description 
            -product_image_sm -product_image_md -product_image_lg
            -product_stock -product_color -product_material -product_ratings
            -product_sales -product_department -product_departmentId -product_type
            -__v`)

        total += foundItem.product_price;
        bought.push(foundItem);
    }

    res.json({
        success: true,
        datatype: 'CHECKOUT',
        date: `${date.toDateString()} ${date.toLocaleTimeString()}`,
        total,
        bought
    })
})

module.exports = {
    checkout
}