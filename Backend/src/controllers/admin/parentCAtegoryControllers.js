const ParentCategory = require("../../models/parentCategory");

const createParentCategory = async (req, res) => {
    try {

        // console.log(req.body)

        const data = new ParentCategory(req.body);
        const response = await data.save();

        res.status(200).json({ message: 'success', data: response })

    }
    catch (error) {
        console.log(error);
        if (error.code === 11000 && error.keyPattern && error.keyPattern.name === 1) return res.status(400).json({ message: 'category already exists' })
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const readParentCategory = async (req, res) => {
    try {
        const data = await ParentCategory.find({ deleted_at: null })
        res.status(200).json({ message: 'success', data })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const updateStatus = async (req, res) => {
    try {
        const data = await ParentCategory.updateOne(
            req.params,
            {
                $set: {
                    status: req.body.status
                }
            }
        )
        res.status(200).json({ message: 'success', data })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })
    }
}

const deleteParentCategory = async (req, res) => {
    try {

        const data = await ParentCategory.updateOne(
            req.params,
            {
                $set: {
                    deleted_at: Date.now()
                }
            }
        )
        res.status(200).json({ message: 'success', data })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const deletedCategory = async (req, res) => {
    try {
        const response = await ParentCategory.find({ deleted_at: { $ne: null } })
        res.status(200).json({ message: 'success', data: response })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}
const multideleteCategory = async (req, res) => {
    try {
        const data = await ParentCategory.updateMany(
            { _id: { $in: req.body.ids } },
            {
                $set: {
                    deleted_at: Date.now()
                }
            }
        )
        res.status(200).json({ message: 'success', data })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const PermanentdeleteParentCategory = async (req, res) => {
    try {
        const data = await ParentCategory.deleteOne(req.params)
        res.status(200).json({ message: 'Success', data })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const parentCategoryByID = async (req, res) => {
    try {
        const response = await ParentCategory.findOne(req.params)
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const upadateCategory = async (req, res) => {
    try {
        const response = await ParentCategory.updateOne(
            req.params,
            {
                $set: req.body
            }
        )
        res.status(200).json({ message: 'Success', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const restoreCategory = async (req, res) => {
    try {
        const response = await ParentCategory.updateOne(
            req.params,
            {
                $set: {
                    deleted_at: null
                }
            }

        )

        res.status(200).json({ message: 'success', data: response })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const activeParentCategory = async (req, res) => {
    try {
        const response = await ParentCategory.find({ deleted_at: null, status: true })
        res.status(200).json({ message: 'success', data: response })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}



module.exports = {
    createParentCategory,
    readParentCategory,
    updateStatus,
    deleteParentCategory,
    deletedCategory,
    multideleteCategory,
    PermanentdeleteParentCategory,
    parentCategoryByID,
    upadateCategory,
    restoreCategory,
    activeParentCategory
}