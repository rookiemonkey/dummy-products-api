const faker = require('faker');
const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    review_name: {
        type: String,
        default: () => faker.name.findName()
    },
    review_details: {
        type: String,
        default: () => faker.lorem.sentence()
    },
    review_rating: {
        type: Number,
        default: () => Math.floor(Math.random() * 6)
    },
    review_productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review;