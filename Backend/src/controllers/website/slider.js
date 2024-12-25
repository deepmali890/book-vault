const Slider = require("../../models/slider");

const readSliderWeb = async (req, res) => {
    try {
        const data = await Slider.find({ deleted_at: null, status:true })
        const filepath = `${req.protocol}://${req.get('host')}/slider-files/`
        res.status(200).json({ message: "Success", data, filepath });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

module.exports ={
    readSliderWeb
}