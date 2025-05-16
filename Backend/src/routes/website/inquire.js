const express = require('express');
const fileHandle = require('../../middlewares/multer');
const { createInquire, readInquire } = require('../../controllers/controllers');

const inquireRouter = express.Router();

inquireRouter.post('/create-inquire',createInquire)
inquireRouter.get('/read-inquire',readInquire)

module.exports = inquireRouter