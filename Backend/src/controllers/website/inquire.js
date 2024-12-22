const Inquire = require("../../models/inquire");

const createInquire = async (req,res)=>{
    try {
        const data = req.body;

        if(req.files){
            if(req.files.pdf) data.pdf = req.files.pdf[0].filename;
        }

        const dataToSave = new Inquire(data);
        const response = await dataToSave.save();
        res.status(200).json({ message: "success", data:response });
        
    }
     catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
        
    }
}

const readInquire = async (req, res) => {
    try {
        const data = await Inquire.find({ deleted_at: null });
        const filepath = `${req.protocol}://${req.get('host')}/inquire-files/`
        res.status(200).json({ message: 'Success', data, filepath })


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

module.exports={
    createInquire,
    readInquire
}