const Blog = require("../../models/blog");

const createBlog = async (req, res) => {
    try {
        const data = req.body;

        if(req.files){
            if(req.files.profile) data.profile = req.files.profile[0].filename;
            if(req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
        }

        const dataToSave = new Blog(data);
        const response = await dataToSave.save();
        res.status(200).json({ message: "success", data:response });

    }
    catch (error) {
        console.error(error);
        res.status(500).send({ message: "Error creating blog" });

    }
}

const readBlog = async (req, res) => {
    try {
        const data = await Blog.find({ deleted_at: null });
        const filepath = `${req.protocol}://${req.get('host')}/blog-files/`
        res.status(200).json({ message: 'Success', data, filepath })


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const updateBlogStatus = async (req, res) => {
    try {
        const data = await Blog.updateOne(
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

module.exports ={
    createBlog,
    readBlog,
    updateBlogStatus
}