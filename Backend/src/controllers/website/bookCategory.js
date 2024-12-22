const BookCategory = require("../../models/bookCategory");

const activeBookCategoryForWeb = async (req, res) => {
    try {
        const response = await BookCategory.find({ deleted_at: null, featured:true, status: true })
         const filepath = `${req.protocol}://${req.get('host')}/web-files/`
        res.status(200).json({ message: 'success', data: response, filepath })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

module.exports={
    activeBookCategoryForWeb
}