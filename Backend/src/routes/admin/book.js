const express = require('express');
const { cretaebook, readBook, updateBookStatus, updateBookType, deleteBook, bookById, updateBook, deletedBook, PermanentdeleteBook, restoreBook, manyDeleteBook } = require('../../controllers/controllers');
const fileHandle = require('../../middlewares/multer');

const bookRouter = express.Router();

bookRouter.post('/create-book', fileHandle('books'),cretaebook)
bookRouter.get('/read-book',readBook)
bookRouter.put('/update-book-status/:_id', updateBookStatus)
bookRouter.put('/update-book-type/:_id', updateBookType)
bookRouter.put('/delete-book/:_id', deleteBook)
bookRouter.get('/read-book/:_id', bookById)
bookRouter.put('/update-book/:_id', updateBook)
bookRouter.get('/deleted-book', deletedBook)
bookRouter.delete('/delete-book/:_id', PermanentdeleteBook)
bookRouter.put('/restore-book/:_id', restoreBook)
bookRouter.put('/many-delete-book', manyDeleteBook)

module.exports= bookRouter