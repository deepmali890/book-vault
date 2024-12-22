const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    name: { type: String, required: true },
    parent_categories: { type: mongoose.Schema.Types.ObjectId, ref: 'parent_categories' },
    book_category: { type: mongoose.Schema.Types.ObjectId, ref: 'book_category' },
    authors: { type: mongoose.Schema.Types.ObjectId, ref: 'authors' },
    frontimg: {
        type: String,
        required: true
    },
    backimg: {
        type: String,
        required: true

    },
    pdf: {
        type: String,
        required: true
    },
    audio: {
        type: String,
        required: true
    },
    multiAudio: Object,
    
    price: {
        type: Number,
        required: true

    },
    mrp: {
        type: Number,
        required: true

    },
    short_description: String,
    description: String,
    type: {
        type: Boolean,
        default: true
    },
    status: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: null
    },
    deleted_at: Date,
    updated_at: {
        type: Date,
        default: Date.now
    }
})

bookSchema.pre('insertOne', function () {
    this.created_at = new Date();
})


bookSchema.pre('save', function () {
    this.created_at = new Date();
})

const Book = mongoose.model('books', bookSchema)

module.exports = Book