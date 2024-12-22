const Slider = require("../../models/slider");

const createSlider = async (req, res) => {
    try {
        const data = req.body;
        if (req.files) {
            if (req.files.thumbnail) data.thumbnail = req.files.thumbnail[0].filename
        }

        const dataToSave = new Slider(data)
        const response = await dataToSave.save();
        res.status(200).json({ message: "Success", data: response });

    }
    catch (error) {
        console.log(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' })
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const readSlider = async (req, res) => {
    try {
        const data = await Slider.find({ deleted_at: null })
        const filepath = `${req.protocol}://${req.get('host')}/slider-files/`
        res.status(200).json({ message: "Success", data, filepath });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const updateSliderStatus = async (req, res) => {
    try {
        const data = await Slider.updateOne(
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

const deleteSlider = async (req, res) => {
    try {
        const data = await Slider.updateOne(
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

const sliderById = async (req, res) => {
    try {
        const response = await Slider.findOne(req.params)
        res.status(200).json({ message: "Success", data: response });


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const updateSlider = async (req, res) => {
    try {
        const response = await Slider.updateOne(
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

const deletedSlider = async (req, res) => {
    try {
        const response = await Slider.find({ deleted_at: { $ne: null } })
        res.status(200).json({ message: "Success", data: response });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const restoreSlider = async (req, res) => {
    try {
        const response = await Slider.updateOne(
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

const PermanentdeleteSlider = async (req, res) => {
    try {
        const data = await Slider.deleteOne(req.params)
        res.status(200).json({ message: "Success", data });

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const multideleteSlider = async (req, res) => {
    try {
        const data = await Slider.updateMany(
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
    createSlider,
    readSlider,
    updateSliderStatus,
    deleteSlider,
    sliderById,
    updateSlider,
    deletedSlider,
    restoreSlider,
    PermanentdeleteSlider,
    multideleteSlider
}