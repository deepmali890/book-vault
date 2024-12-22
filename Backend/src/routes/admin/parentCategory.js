const express = require('express');
const multer = require('multer')
const {
    createParentCategory,
    readParentCategory,
    updateStatus,
    deleteParentCategory,
    deletedCategory,
    PermanentdeleteParentCategory,
    parentCategoryByID,
    upadateCategory,
    multideleteCategory,
    restoreCategory,
    activeParentCategory
} = require('../../controllers/controllers');

const parentCategoryRouter = express.Router();

parentCategoryRouter.use(multer().none())


parentCategoryRouter.post('/create-Parent-Category', createParentCategory)
parentCategoryRouter.get('/read-parent-category',readParentCategory)
parentCategoryRouter.put('/update-status/:_id',updateStatus)
parentCategoryRouter.put('/delete-Parent-Category/:_id',deleteParentCategory)
parentCategoryRouter.get('/deleted-category',deletedCategory)
parentCategoryRouter.put('/multidelete-category',multideleteCategory)
parentCategoryRouter.delete('/delete-category/:_id',PermanentdeleteParentCategory)
parentCategoryRouter.get('/read-category/:_id',parentCategoryByID)
parentCategoryRouter.put('/update-category/:_id',upadateCategory)
parentCategoryRouter.put('/restore-category/:_id',restoreCategory)
parentCategoryRouter.get('/active-category',activeParentCategory)

module.exports = parentCategoryRouter