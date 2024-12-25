const express = require('express')
const { readSliderWeb } = require('../../controllers/controllers')

const sliderRouterForWeb = express.Router()

sliderRouterForWeb.get('/read-slder-web',readSliderWeb)


module.exports= sliderRouterForWeb;