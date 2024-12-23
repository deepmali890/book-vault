const mongoose = require('mongoose')

const cartSchema = mongoose.Schema({
    name:String,
    price:Number,
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'books'
    },
    quantity:{
        type:Number,
        default:1
    },
    image:String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
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

cartSchema.pre('insertOne',function(){
    this.created_at = new Date();
})


cartSchema.pre('save',function(){
    this.created_at = new Date();
})

const Cart = mongoose.model('carts', cartSchema)

module.exports = Cart;