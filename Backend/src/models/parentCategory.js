const mongoose = require('mongoose')

const parentCategorySchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    status: {
        type: Boolean,
        default: true
    },
    deleted_at: {
        type: Date,
        default: null
    },
    created_at: {
        type: Date,
        // default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }

});

parentCategorySchema.pre('insertOne',function(){
    this.created_at = new Date();
})


parentCategorySchema.pre('save',function(){
    this.created_at = new Date();
})

const ParentCategory = mongoose.model('parent_categories', parentCategorySchema)

module.exports = ParentCategory;