const mongoose = require('mongoose');

const cartSchema = mongoose.Schema({
    name: String,
    price: Number,
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'books'
    },
    quantity: {
        type: Number,
        default: 1
    },
    image: String,
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    created_at: {
        type: Date,
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

// Set created_at before saving
cartSchema.pre('save', function() {
    if (!this.created_at) {
        this.created_at = new Date();
    }
    this.updated_at = new Date(); // Update `updated_at` to the current date
});

const Cart = mongoose.model('carts', cartSchema);

module.exports = Cart;
