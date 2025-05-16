const Author = require("../../models/author");
const uploadToSupabase = require("../../utils/uploadToSupabase");


const createAuthor = async (req, res) => {
    try {

        const data = req.body;
        if (req.file) {
            const publicUrl = await uploadToSupabase(req.file, 'authorThumbnail/thumbnails');
            data.thumbnail = publicUrl;
        }

        const dataToSave = new Author(data);

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

const readAuthor = async (req, res) => {
    try {
        const data = await Author.find({ deleted_at: null });
        const filepath = `${req.protocol}://${req.get('host')}/author-files/`
        res.status(200).json({ message: 'Success', data, filepath })


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const updateAuthorStatus = async (req, res) => {
    try {
        const data = await Author.updateOne(
            req.params,
            { $set: { status: req.body.status } }
        )
        res.status(200).json({ message: 'Success', data })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const deleteAuthor = async (req, res) => {
    try {

        const data = await Author.updateOne(
            req.params,
            { $set: { deleted_at: Date.now() } }
        )
        res.status(200).json({ message: 'Success', data })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const AuthorById = async (req, res) => {
    try {

        const response = await Author.findOne(req.params)
        res.status(200).json({ message: 'Success', data: response })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const updateAuthor = async (req, res) => {
    try {
        const response = await Author.updateOne(
            req.params,
            { $set: req.body }
        )
        res.status(200).json({ message: 'Success', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const deletedAuthor = async (req, res) => {
    try {
        const response = await Author.find({ deleted_at: { $ne: null } })

        res.status(200).json({ message: 'Success', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const restoreAuthor = async (req, res) => {
    try {
        const response = await Author.updateOne(
            req.params,
            { $set: { deleted_at: null } }
        )
        res.status(200).json({ message: 'Success', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const PermanentdeleteAuthor = async (req, res) => {
    try {
        const data = await Author.deleteOne(req.params)
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const multiDeleteAuthor = async (req, res) => {
    try {
        const data = await Author.updateMany(
            { _id: { $in: req.body.ids } },
            { $set: { deleted_at: Date.now() } }
        )
        res.status(200).json({ message: 'success', data })

    }
    catch (error) {
        console.log(error)
        res.status(500).json({ message: "internal Server Error" })

    }
}

const activeAuthor = async (req, res) => {
    try {
        const response = await Author.find({ deleted_at: null, status: true })
        res.status(200).json({ message: 'success', data: response })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

module.exports = {
    createAuthor,
    readAuthor,
    updateAuthorStatus,
    deleteAuthor,
    AuthorById,
    updateAuthor,
    deletedAuthor,
    restoreAuthor,
    PermanentdeleteAuthor,
    multiDeleteAuthor,
    activeAuthor
}