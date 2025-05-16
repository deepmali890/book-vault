const express = require('express');
const { createAuthor,
    readAuthor,
    updateAuthorStatus,
    deleteAuthor,
    AuthorById,
    updateAuthor,
    deletedAuthor,
    restoreAuthor,
    PermanentdeleteAuthor,
    multiDeleteAuthor,
    activeAuthor
} = require('../../controllers/controllers');
const uploadFields = require('../../middlewares/upload.middleware');

const authorRouter = express.Router();

authorRouter.post('/create-author', uploadFields.authorThumbnail,  createAuthor)
authorRouter.get('/read-author', readAuthor)
authorRouter.put('/update-author-status/:_id', updateAuthorStatus)
authorRouter.put('/delete-author/:_id', deleteAuthor)
authorRouter.get('/read-author/:_id', AuthorById)
authorRouter.put('/update-author/:_id', updateAuthor)
authorRouter.get('/deleted-author', deletedAuthor)
authorRouter.put('/restore-author/:_id', restoreAuthor)
authorRouter.delete('/delete-author/:_id', PermanentdeleteAuthor)
authorRouter.put('/multi-delete-author', multiDeleteAuthor)
authorRouter.get('/active-author', activeAuthor)

module.exports = authorRouter;