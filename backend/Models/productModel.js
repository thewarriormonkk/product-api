const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    description: String,
    outOfStock: Boolean,
    rating: Number
});

const productModel = mongoose.model('productItem', productSchema);

module.exports = productModel;