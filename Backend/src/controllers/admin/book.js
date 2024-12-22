const Book = require("../../models/book");

const cretaebook = async (req, res) => {
    try {

        const data = req.body;

        if (req.files) {
            if (req.files.frontimg) data.frontimg = req.files.frontimg[0].filename;
            if (req.files.backimg) data.backimg = req.files.backimg[0].filename;
            if (req.files.pdf) data.pdf = req.files.pdf[0].filename;
            if (req.files.audio) data.audio = req.files.audio[0].filename;
            if (req.files.multiAudio) data.multiAudio = req.files.multiAudio.map((audio) => audio.filename)
        }

        const dataToSave = new Book(data)
        const response = await dataToSave.save();
        res.status(200).json({ message: "Success", data: response });

        console.log(data)

    }
    catch (error) {
        console.log(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' })
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const readBook = async (req, res) => {
    try {
        const data = await Book.find({ deleted_at: null })
            .populate('parent_categories', 'name description')
            .populate('book_category', 'name description')
            .populate('authors', 'name description')

        const filepath = `${req.protocol}://${req.get('host')}/book-files/`
        const pdfPath = `${req.protocol}://${req.get('host')}/book-files/pdfs/`;
        const audioPath = `${req.protocol}://${req.get('host')}/book-files/audio/`;


        console.log(data)
        res.status(200).json({ message: 'success', data, filepath, pdfPath, audioPath })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const updateBookStatus = async (req, res) => {
    try {
        const data = await Book.updateOne(
            req.params,
            {
                $set: {
                    status: req.body.status
                }
            }
        )
        res.status(200).json({ message: 'success', data })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const updateBookType = async (req, res) => {
    try {
        const data = await Book.updateOne(
            req.params,
            {
                $set: {
                    status: req.body.type
                }
            }
        )
        res.status(200).json({ message: 'success', data })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const deleteBook = async (req, res) => {
    try {
        const data = await Book.updateOne(
            req.params,
            {
                $set: {
                    deleted_at: Date.now()
                }
            }
        )
        res.status(200).json({ message: 'success', data })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const bookById = async (req, res) => {
    try {
        const response = await Book.findOne(req.params)
            .populate('parent_categories', 'name description')
            .populate('book_category', 'name description')
            .populate('authors', 'name description')

        res.status(200).json({ message: 'success', data: response })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const updateBook = async (req, res) => {
    try {
        const response = await Book.updateOne(
            req.params,
            {
                $set: req.body
            }
        )
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const deletedBook = async (req, res) => {
    try {
        const response = await Book.find({ deleted_at: { $ne: null } })
        .populate('parent_categories', 'name description')
        .populate('book_category', 'name description')
        .populate('authors', 'name description')

        const filepath = `${req.protocol}://${req.get('host')}/book-files/`
     

             res.status(200).json({ message: 'success', data:response ,filepath })

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const PermanentdeleteBook = async(req,res)=>{
    try {
        const data = await Book.deleteOne(req.params)
        res.status(200).json({ message: 'success', data })
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const restoreBook = async(req,res)=>{
    try {
        const response = await Book.updateOne(
            req.params,
            {
                $set:{
                    deleted_at: null
                }
            }
        )
        res.status(200).json({ message: 'success', data:response })
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const manyDeleteBook = async(req,res)=>{
    try {
        const data = await Book.updateMany(
            { _id: { $in: req.body.ids } },
            { $set: { deleted_at: Date.now() } }
        )
        res.status(200).json({ message: 'success', data })
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

module.exports = {
    cretaebook,
    readBook,
    updateBookStatus,
    updateBookType,
    deleteBook,
    bookById,
    updateBook,
    deletedBook,
    PermanentdeleteBook,
    restoreBook,
    manyDeleteBook
}