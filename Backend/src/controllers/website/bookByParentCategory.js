const Book = require("../../models/book");

const readBookByParentCategoryWeb = async (req, res) => {
    try {
        const data = await Book.find({ parent_categories: req.params.id, deleted_at: null, status: true })
            .populate('parent_categories')
            .populate('book_category')
            .populate('authors')

         const filepath = `${req.protocol}://${req.get('host')}/book-files/`

        // console.log(data)
        res.status(200).json({ message: 'success', data, filepath });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error reading book by parent category' });

    }
}

module.exports ={
    readBookByParentCategoryWeb
}