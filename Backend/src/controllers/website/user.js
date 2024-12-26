const User = require("../../models/user");
const bcrypt = require('bcrypt')
const joi = require ('joi')
const jwt  = require ('jsonwebtoken')

const regsiterUser = async (req, res,  next) => {

    const {error:validationError} = validateUser(req.body);

    const {firstname,lastname,email,password} = req.body;

    try {
        if(validationError){
            const error = new Error(validationError.details[0].message)
            error.statusCode = 400;
            throw error;
        }


        const formetedName = firstname.toLowerCase()
        const formetedLastName = lastname.toLowerCase()
        const formetedEmail = email.toLowerCase()

        const findedUser = await User.findOne({email:formetedEmail})
        if (findedUser) {
            const error = new Error('this email is already exist')
            error.statusCode = 400;
            throw error
        }

        const hashedPassword = await bcrypt.hash(password,10)
        const newUser = new User({
            firstname:formetedName,
            lastname:formetedLastName,
            email:formetedEmail,
            password:hashedPassword
            })

            await newUser.save();
            res.status(200).json({message:"user Regsiter successfully", status:true })


 
    }
    catch (error) {
        next(error)
        console.error(error);
        // res.status(500).json({ message: "Internal Server Error" });
    }
}

const loginUser = async(req,res,next)=>{

    const {email,password} = req.body;
    try {
        const formeteddEmail = email.toLowerCase();

        const findededUser = await User.findOne({email:formeteddEmail})
        if(!findededUser){
            const error = new Error('this email is not exist')
            error.statusCode = 400;
            throw error
        }
        
        const issPassword = await bcrypt.compare(password,findededUser.password)
        if(!issPassword){
            const error = new Error('password is not correct')
            error.statusCode = 400;
            throw error
            }

            const accessToken = jwt.sign({email:formeteddEmail,userId:findededUser._id},process.env.JWT_SECRET_KEY,{expiresIn:'7d'})
            res.status(200).json({message:"login successfully",status:true,token:accessToken,userId:findededUser._id})
    } 
    catch (error) {
        next(error)
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}

module.exports={
    regsiterUser,
    loginUser
}


function validateUser(data){
    const userSchema = joi.object({
        firstname:joi.string().min(2).required(),
        lastname:joi.string().min(2).required(),
        email:joi.string().email().required(),
        password:joi.string().min(6).max(12).required()
    });

    return userSchema.validate(data)
}