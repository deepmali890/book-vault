const BookCategory = require("../../models/bookCategory");

const createBookCategory = async (req, res) => {
    try {

        const data = req.body;
        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;

        }
        const dataToSave = new BookCategory(data);
        const response = await dataToSave.save();
        console.log(data)

        res.status(200).json({ message: 'Success', data: response })



    }
    catch (error) {
        console.log(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' })
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const readBookCategory = async (req, res) => {
    try {
        const data = await BookCategory.find({ deleted_at: null }).populate('parent_categories', 'name description')
        const filepath = `${req.protocol}://${req.get('host')}/web-files/`

        res.status(200).json({ message: 'success', data, filepath })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const updateBookCategoryStatus = async (req, res) => {
    try {
        const data = await BookCategory.updateOne(
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

const updateCategoryFeature = async (req, res) => {
    try {
        const data = await BookCategory.updateOne(
            req.params,
            {
                $set: {
                    featured: req.body.featured
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

const deleteBookcategory = async (req, res) => {
    try {
        const data = await BookCategory.updateOne(
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

const BookCategoryById = async (req, res) => {
    try {
        const response = await BookCategory.findOne(req.params).populate('parent_categories', 'name description')
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const updateBookCategory = async (req, res) => {
    try {
        const response = await BookCategory.updateOne(
            req.params,
            {
                $set: req.body
            }
        )
        res.status(200).json({ message: 'Success', data: response })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const deletedcategory = async (req, res) => {
    try {
        const response = await BookCategory.find({ deleted_at: { $ne: null } })
        res.status(200).json({ message: 'success', data: response })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const restoreBookCategory = async (req, res) => {
    try {
        const response = await BookCategory.updateOne(
            req.params,
            {
                $set: { deleted_at: null }
            }
        )
        res.status(200).json({ message: 'success', data: response })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const PermanentdeleteCategory = async (req, res) => {
    try {

        const data = await BookCategory.deleteOne(req.params);
        res.status(200).json({ message: 'success', data })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const multiDeleteBookCategory = async (req, res) => {
    try {
        const data = await BookCategory.updateMany(
            { _id: { $in: req.body.ids } },
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

const activeBookCategory = async (req, res) => {
    try {
        const response = await BookCategory.find({ deleted_at: null, status: true })
        res.status(200).json({ message: 'success', data: response })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}
module.exports = {
    createBookCategory,
    readBookCategory,
    updateBookCategoryStatus,
    updateCategoryFeature,
    deleteBookcategory,
    BookCategoryById,
    updateBookCategory,
    deletedcategory,
    restoreBookCategory,
    PermanentdeleteCategory,
    multiDeleteBookCategory,
    activeBookCategory
}