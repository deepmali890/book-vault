const mongoose = require('mongoose')

const authorSchema =mongoose.Schema({
    name: {type:String,required:true},
    email: {type:String,required:true},
    description: {type:String,required:true},
    thumbnail:String,
    status:{
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

authorSchema.pre('insertOne',function(){
    this.created_at = new Date();
})


authorSchema.pre('save',function(){
    this.created_at = new Date();
})

const Author= mongoose.model("authors",authorSchema)

module.exports=Author
