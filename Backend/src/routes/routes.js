const express = require('express');
const parentCategoryRouter = require('./admin/parentCategory');
const bookCategoryRouter = require('./admin/bookCategory');
const authorRouter = require('./admin/author');
const bookRouter = require('./admin/book');
const sliderRouter = require('./admin/slider');
const storyRouter = require('./admin/story');
const parentCategoryRouterWeb = require('./website/parentCategoryweb');
const bookByParentCategoryRouter = require('./website/bookByParentCategory');
const authorWebRouter = require('./website/author');
const inquireRouter = require('./website/inquire');
const blogRouter = require('./admin/blog');
const blogRouterWeb = require('./website/blogweb');
const bookCategoryWebRouter = require('./website/bookcategoryWeb');
const bookWebRouter = require('./website/books');
const teamRouter = require('./admin/team');
const cartRouter = require('./website/cart');
const userRouter = require('./website/user');
const sliderRouterForWeb = require('./website/slider');
const paymentOutRouter = require('./website/paymentRoutes');

const adminRouter = express.Router();
const websiteRouter = express.Router();
const appRouter = express.Router();

adminRouter.use('/parent-category',parentCategoryRouter)
adminRouter.use('/book-category',bookCategoryRouter)
adminRouter.use('/author',authorRouter)
adminRouter.use('/book',bookRouter)
adminRouter.use('/slider',sliderRouter)
adminRouter.use('/story',storyRouter)
adminRouter.use('/blog',blogRouter)
adminRouter.use('/team',teamRouter)


websiteRouter.use('/parent-category-web',parentCategoryRouterWeb)
websiteRouter.use('/books',bookByParentCategoryRouter)
websiteRouter.use('/author',authorWebRouter)
websiteRouter.use('/inquire',inquireRouter)
websiteRouter.use('/blog-web',blogRouterWeb)
websiteRouter.use('/read-bookCategory-feature',bookCategoryWebRouter)
websiteRouter.use('/allbooks',bookWebRouter)
websiteRouter.use('/cart',cartRouter)
websiteRouter.use('/user',userRouter)
websiteRouter.use('/slider-web',sliderRouterForWeb)
websiteRouter.use('/payment',paymentOutRouter)


module.exports={
    adminRouter,
    websiteRouter,
    appRouter
}