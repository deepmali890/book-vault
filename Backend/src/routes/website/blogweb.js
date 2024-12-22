const express = require('express');
const { readBlogWeb } = require('../../controllers/controllers');

const blogRouterWeb = express.Router();

blogRouterWeb.get('/read-blog-web',readBlogWeb)

module.exports= blogRouterWeb