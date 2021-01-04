const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    review_name: {
        type: String,
        required: [true, `Reviewer's name is required`]
    },
    review_details: {
        type: String,
        required: [true, `Review details is required`]
    },
    review_rating: {
        type: Number,
        default: () => Math.floor(Math.random() * 6)
    },
    review_avatar: {
        type: String,
        required: [true, `Reviewer's avatar is required`]
    },
    review_productid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
})

const Review = mongoose.model("Review", reviewSchema)

module.exports = Review;