const Team = require("../../models/team");

const cretaeTeam = async(req,res)=>{
    try {
        const data = req.body;
         
        if(req.files){
            if(req.files.profile) data.profile = req.files.profile[0].filename;
        }

        const dataToSave = new Team(data);
        const response = await dataToSave.save();
        res.status(200).json({message:"success", data:response});
        
    }
     catch (error) {
        console.log(error)
        res.status(500).json({message:"intaernal server error",});
        
    }
}

const readTeam = async (req, res) => {
    try {
        const data = await Team.find({ deleted_at: null });
        const filepath = `${req.protocol}://${req.get('host')}/team-files/`
        res.status(200).json({ message: 'Success', data, filepath })


    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

module.exports={
    cretaeTeam,
    readTeam
}