const express = require('express')
const { createCheckOut } = require('../../controllers/controllers')

const paymentOutRouter = express.Router()

paymentOutRouter.post('/create-checkOut',createCheckOut)

module.exports=paymentOutRouter;