const express = require('express');
const allRoutes = require('./src/app');
require('dotenv').config()
require('./src/db/config')
const cors = require('cors')
// const path = require('path');

const app = express();

app.use(cors())
app.use(express.json());

app.use('/api', allRoutes)





app.use((error, req, res, next) => {
    const message = error.message || 'server error'
    const statusCode = error.statusCode || 500;
    res.status(statusCode).json({ message:message });

})
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 1200;
  app.listen(PORT, () => {
    console.log(`🚀 Server is live at: http://localhost:${PORT}
    🌍 Environment: ${process.env.NODE_ENV || "development"}`);
  });
}

