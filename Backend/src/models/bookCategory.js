const mongoose = require('mongoose')

const bookCategorySchema= mongoose.Schema({
    name: {type:String,required:true,unique:true},
    description: {type:String,required:true},
    thumbnail:String,
    parent_categories: {type:mongoose.Schema.Types.ObjectId,ref:'parent_categories'},
    status:{
        type:Boolean,
        default:true
    },
    slug:{
        type:String
    },
    featured:{
        type:Boolean,
        default:true
    },
    created_at:{
        type:Date,
        default:null
    },
    deleted_at:Date,
    updated_at:{
        type:Date,
        default:Date.now
    }
})

bookCategorySchema.pre('insertOne',function(){
    this.created_at = new Date();
})


bookCategorySchema.pre('save',function(){
    this.created_at = new Date();
})

const BookCategory = mongoose.model('book_category',bookCategorySchema)

module.exports=BookCategory