const express = require('express');
const { createStory,
    readStory,
    updateStoryStatus,
    deleteStory,
    storyById,
    updateStory,
    deletedStory,
    restoreStory,
    PermanentdeleteStory,
    multiDeleteStory
} = require('../../controllers/controllers');
const fileHandle = require('../../middlewares/multer');

const storyRouter = express.Router();

storyRouter.post('/cretae-story', createStory)
storyRouter.get('/read-story', readStory)
storyRouter.put('/update-story-status/:_id', updateStoryStatus)
storyRouter.put('/delete-story/:_id', deleteStory)
storyRouter.get('/read-story/:_id', storyById)
storyRouter.put('/update-story/:_id', updateStory)
storyRouter.get('/deleted-story', deletedStory)
storyRouter.put('/restore-story/:_id', restoreStory)
storyRouter.delete('/delete-story/:_id', PermanentdeleteStory)
storyRouter.put('/multi-delete-story', multiDeleteStory)

module.exports = storyRouter;