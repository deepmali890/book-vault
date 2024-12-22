const Author = require("../../models/author");

const activeAuthorWeb = async (req, res) => {
    try {
        const response = await Author.find({ deleted_at: null, status: true })
           const filepath = `${req.protocol}://${req.get('host')}/author-files/`
        res.status(200).json({ message: 'success', data: response, filepath })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

module.exports={
    activeAuthorWeb
}