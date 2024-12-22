const express = require('express');
const { readBookByParentCategoryWeb } = require('../../controllers/controllers');

const bookByParentCategoryRouter= express.Router();

bookByParentCategoryRouter.get('/book-by-parent-category/:id',readBookByParentCategoryWeb)

module.exports= bookByParentCategoryRouter;