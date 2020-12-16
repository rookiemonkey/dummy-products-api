const faker = require('faker');
const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
    product_type: {
        type: String,
        required: [true, 'Product type is required']
    },
    product_name: {
        type: String,
        required: [true, 'Product name is required']
    },
    product_department: {
        type: String,
        required: [true, 'Product department is required']
    },
    product_departmentId: {
        type: String,
        required: [true, 'Product department id is required']
    },
    product_image_sm: {
        type: String,
        default: "https://via.placeholder.com/150?text='placeholder.com'"
    },
    product_image_md: {
        type: String,
        default: "https://via.placeholder.com/300?text='placeholder.com'"
    },
    product_image_lg: {
        type: String,
        default: "https://via.placeholder.com/600?text='thanks to placeholder.com'"
    },
    product_stock: {
        type: Number,
        default: () => Math.floor(Math.random() * 151)
    },
    product_color: {
        type: String,
        default: () => faker.commerce.color()
    },
    product_price: {
        type: Number,
        default: () => parseFloat(faker.commerce.price())
    },
    product_material: {
        type: String,
        default: () => faker.commerce.productMaterial()
    },
    product_description: {
        type: String,
        default: () => faker.commerce.productDescription()
    },
    product_ratings: {
        type: Number,
        default: () => Math.floor(Math.random() * 6)
    },
    product_sales: {
        type: Number,
        default: () => Math.floor(Math.random() * 1501)
    },
    product_reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
})

const Product = mongoose.model("Product", productSchema)

module.exports = Product;