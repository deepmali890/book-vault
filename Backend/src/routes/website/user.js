const express = require('express')
const { regsiterUser, loginUser } = require('../../controllers/controllers')

const userRouter = express.Router()

userRouter.post('/register',regsiterUser)
userRouter.post('/login',loginUser)

module.exports = userRouter