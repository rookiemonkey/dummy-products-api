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
    const itemsBought = new Array();
    let totalAmount = 0;

    for (let i = 0; i < items.length; i++) {
        const foundItem = await Product
            .findById(items[i]._id)
            .select(`-product_reviews -product_description 
            -product_stock -product_color -product_material -product_ratings
            -product_sales -product_department -product_departmentId -product_type
            -__v`)

        const unfrozenDocument = foundItem.toObject();
        const totalItemPrice = unfrozenDocument.product_price * items[i].product_quantity;

        unfrozenDocument.product_quantity = items[i].product_quantity;

        totalAmount += totalItemPrice;
        itemsBought.push(unfrozenDocument);
    }

    res.json({
        success: true,
        datatype: 'CHECKOUT',
        date: `${date.toDateString()} ${date.toLocaleTimeString()}`,
        totalItems: itemsBought.length,
        totalAmount,
        itemsBought,
    })
})

module.exports = {
    checkout
}