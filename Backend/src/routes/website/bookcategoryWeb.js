const express = require('express');
const { activeBookCategoryForWeb } = require('../../controllers/controllers');

const bookCategoryWebRouter= express.Router();

bookCategoryWebRouter.get('/read-book-category',activeBookCategoryForWeb)

module.exports=bookCategoryWebRouter;