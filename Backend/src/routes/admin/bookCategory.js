const express = require('express');
const { createBookCategory,
    readBookCategory,
    updateBookCategoryStatus,
    updateCategoryFeature,
    deleteBookcategory,
    BookCategoryById,
    updateBookCategory, 
    deletedcategory,
    restoreBookCategory,
    PermanentdeleteCategory,
    multiDeleteBookCategory,
    activeBookCategory} = require('../../controllers/controllers');
const fileHandle = require('../../middlewares/multer');

const bookCategoryRouter = express.Router();

bookCategoryRouter.post('/create-book-category', fileHandle('book-category'), createBookCategory)
bookCategoryRouter.get('/read-book-category', readBookCategory)
bookCategoryRouter.put('/update-book-category-status/:_id', updateBookCategoryStatus)
bookCategoryRouter.put('/update-book-category-feature/:_id', updateCategoryFeature)
bookCategoryRouter.put('/delete-book-category/:_id', deleteBookcategory)
bookCategoryRouter.get('/read-category/:_id', BookCategoryById)
bookCategoryRouter.put('/update-book-category/:_id', updateBookCategory)
bookCategoryRouter.get('/deleted-category',deletedcategory)
bookCategoryRouter.put('/restore-category/:_id',restoreBookCategory)
bookCategoryRouter.delete('/delete-category/:_id',PermanentdeleteCategory)
bookCategoryRouter.put('/multi-delete-category',multiDeleteBookCategory)
bookCategoryRouter.get('/active-book-category',activeBookCategory)

module.exports = bookCategoryRouter;