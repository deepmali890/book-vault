const Book = require("../../models/book");

const readBookWeb = async (req, res) => {
    try {
        const data = await Book.find({ deleted_at: null, status: true, type:true })
            .populate('parent_categories', 'name description')
            .populate('book_category', 'name description slug')
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

module.exports={
    readBookWeb
}