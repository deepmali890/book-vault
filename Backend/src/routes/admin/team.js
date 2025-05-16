const express = require('express');
const { cretaeTeam, readTeam } = require('../../controllers/controllers');
const fileHandle = require('../../middlewares/multer');

const teamRouter = express.Router();

teamRouter.post('/create-team',cretaeTeam)
teamRouter.get('/read-team',readTeam)

module.exports= teamRouter;