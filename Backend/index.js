const express = require('express');
const allRoutes = require('./src/app');
require('dotenv').config()
require('./src/db/config')
const cors = require('cors')
const path = require('path');

const app = express();

app.use(cors())
app.use(express.json());

app.use('/api', allRoutes)

app.use('/web-files', express.static(path.join(__dirname, 'src', 'uploads', 'book-category')));
app.use('/author-files', express.static(path.join(__dirname, 'src', 'uploads', 'author')));
app.use('/book-files', express.static(path.join(__dirname, 'src', 'uploads', 'books')));
app.use('/book-files/pdfs/', express.static(path.join(__dirname, 'src', 'uploads', 'books')));
app.use('/book-files/audio/', express.static(path.join(__dirname, 'src', 'uploads', 'books')));
app.use('/slider-files', express.static(path.join(__dirname, 'src', 'uploads', 'slider')));
app.use('/story-files', express.static(path.join(__dirname, 'src', 'uploads', 'story')));
app.use('/story-files/video/', express.static(path.join(__dirname, 'src', 'uploads', 'story')));
app.use('/inquire-files/', express.static(path.join(__dirname, 'src', 'uploads', 'inquire')));
app.use('/blog-files', express.static(path.join(__dirname, 'src', 'uploads', 'blog')));
app.use('/team-files/', express.static(path.join(__dirname, 'src', 'uploads', 'team')));

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})

