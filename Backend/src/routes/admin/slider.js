const express = require('express');
const {
    createSlider,
    readSlider,
    updateSliderStatus,
    deleteSlider,
    sliderById,
    updateSlider,
    deletedSlider,
    restoreSlider,
    PermanentdeleteSlider,
    multideleteSlider
} = require('../../controllers/controllers');
const fileHandle = require('../../middlewares/multer');

const sliderRouter = express.Router();

sliderRouter.post('/create-slider', fileHandle('slider'), createSlider)
sliderRouter.get('/read-slider', readSlider)
sliderRouter.put('/update-slider-status/:_id', updateSliderStatus)
sliderRouter.put('/delete-slider/:_id', deleteSlider)
sliderRouter.get('/read-slider/:_id', sliderById)
sliderRouter.put('/update-slider/:_id', updateSlider)
sliderRouter.get('/read-deleted-slider', deletedSlider)
sliderRouter.put('/restore-slider/:_id', restoreSlider)
sliderRouter.delete('/delete-slider/:_id', PermanentdeleteSlider)
sliderRouter.put('/multi-delete-slider', multideleteSlider)

module.exports = sliderRouter;