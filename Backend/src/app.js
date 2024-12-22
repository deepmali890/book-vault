const express = require('express');
const { adminRouter, websiteRouter, appRouter } = require('./routes/routes');

const allRoutes = express.Router();


allRoutes.use('/admin-panel',adminRouter);
allRoutes.use('/website',websiteRouter);
allRoutes.use('/app',appRouter);

module.exports= allRoutes;