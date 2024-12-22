const mongoose = require('mongoose')


const sliderSchema= mongoose.Schema({
    name: {type:String,required:true},
    heading: {type:String,required:true},
    sub_heading: {type:String,required:true},
    description:{type:String},
    thumbnail: {type:String,required:true},
    status: {type: Boolean,default: true },
    created_at: {type: Date,default: null },
    deleted_at: Date,
    updated_at: {type: Date,default: Date.now}
    
})

sliderSchema.pre('insertOne', function () {
    this.created_at = new Date();
})


sliderSchema.pre('save', function () {
    this.created_at = new Date();
})

const Slider = mongoose.model('sliders',sliderSchema)

module.exports = Slider;