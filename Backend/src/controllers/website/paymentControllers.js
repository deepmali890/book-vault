const stripe = require('stripe')(`${process.env.STRIPE_SECRET_KEY}`)


const createCheckOut = async(req,res,next)=>{
    try {
        console.log(req.body)
        res.status(200).json({message:'success' , status:true})
    }
     catch (error) {
        next(error)
        console.log(error.message)
        res.status(500).json({message:error.message})
        
    }
}

module.exports ={createCheckOut}