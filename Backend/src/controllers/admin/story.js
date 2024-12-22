const Story = require("../../models/story");

const createStory = async (req, res) => {
    try {
        const data = req.body;

        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename;
            if (req.files.banner) data.banner = req.files.banner[0].filename;
            if (req.files.video) data.video = req.files.video[0].filename;
        }

        const dataToSave = new Story(data);
        const response = await dataToSave.save();
        res.status(200).json({ message: "Success", data: response });

    }
    catch (error) {
        console.log(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' })
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const readStory = async (req, res) => {
    try {
        const data = await Story.find({ deleted_at: null })
        const filepath = `${req.protocol}://${req.get('host')}/story-files/`
        const videoPath = `${req.protocol}://${req.get('host')}/story-files/video/`;

        res.status(200).json({ message: "Success", data, filepath, videoPath });



    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const updateStoryStatus = async (req, res) => {
    try {
        const data = await Story.updateOne(
            req.params,
            { $set: { status: req.body.status } }
        )
        res.status(200).json({ message: "Success", data });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const deleteStory = async (req, res) => {
    try {
        const data = await Story.updateOne(
            req.params,
            { $set: { deleted_at: Date.now() } }
        )
        res.status(200).json({ message: "Success", data });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const storyById = async (req, res) => {
    try {
        const response = await Story.findOne(req.params)
        res.status(200).json({ message: "Success", data: response });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const updateStory = async (req, res) => {
    try {
        const response = await Story.updateOne(
            req.params,
            { $set: req.body }
        )
        res.status(200).json({ message: "Success", data: response });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const deletedStory = async (req, res) => {
    try {
        const response = await Story.find({ deleted_at: { $ne: null } })
        res.status(200).json({ message: "Success", data: response });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const restoreStory = async (req, res) => {
    try {
        const response = await Story.updateOne(
            req.params,
            { $set: { deleted_at: null } }
        )
        res.status(200).json({ message: "Success", data: response });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const PermanentdeleteStory = async (req, res) => {
    try {
        const data = await Story.deleteOne(req.params)
        res.status(200).json({ message: "Success", data });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const multiDeleteStory = async (req, res) => {
    try {
        const data = await Story.updateMany(
            { _id: { $in: req.body.ids } },
            { $set: { deleted_at: Date.now() } }
        )
        res.status(200).json({ message: "Success", data });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

module.exports = {
    createStory,
    readStory,
    updateStoryStatus,
    deleteStory,
    storyById,
    updateStory,
    deletedStory,
    restoreStory,
    PermanentdeleteStory,
    multiDeleteStory
}