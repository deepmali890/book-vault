const express = require('express');
const { activeAuthorWeb } = require('../../controllers/controllers');

const authorWebRouter = express.Router();

authorWebRouter.get('/read_author',activeAuthorWeb)

module.exports= authorWebRouter;