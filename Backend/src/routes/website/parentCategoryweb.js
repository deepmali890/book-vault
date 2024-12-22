const express = require('express');
const { activeParentCategoryWeb } = require('../../controllers/controllers');


const parentCategoryRouterWeb = express.Router();

parentCategoryRouterWeb.get('/active-category',activeParentCategoryWeb)

module.exports = parentCategoryRouterWeb;