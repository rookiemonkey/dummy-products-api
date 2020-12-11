const faker = require('faker');
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_type: {
        type: String,
        required: true
    },
    product_name: {
        type: String,
        required: true
    },
    product_department: {
        type: String,
        default: faker.commerce.department()
    },
    product_color: {
        type: String,
        default: faker.commerce.color()
    },
    product_price: {
        type: Number,
        default: parseFloat(faker.commerce.price())
    },
    product_material: {
        type: String,
        default: faker.commerce.productMaterial()
    },
    product_description: {
        type: String,
        default: faker.commerce.productDescription()
    }
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product;