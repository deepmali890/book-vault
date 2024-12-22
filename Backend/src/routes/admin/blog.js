const express = require('express')
const fileHandle = require('../../middlewares/multer')
const { createBlog, readBlog, updateBlogStatus } = require('../../controllers/controllers')

const blogRouter = express.Router()

blogRouter.post('/create-blog',fileHandle('blog'),createBlog) 
blogRouter.get('/read-blog',readBlog) 
blogRouter.put('/update-blog-status/:_id',updateBlogStatus) 

module.exports = blogRouter;