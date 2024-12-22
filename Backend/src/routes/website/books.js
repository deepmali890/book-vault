const express = require('express');
const { readBookWeb } = require('../../controllers/controllers');

const bookWebRouter = express.Router();

bookWebRouter.get('/read-books',readBookWeb)

module.exports =bookWebRouter;