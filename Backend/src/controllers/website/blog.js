const Blog = require("../../models/blog");

const readBlogWeb = async (req, res) => {
    try {
        const data = await Blog.find({ deleted_at: null, status: true });
        const filepath = `${req.protocol}://${req.get('host')}/blog-files/`
        res.status(200).json({ message: 'Success', data, filepath })


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}



module.exports= {
    readBlogWeb
}