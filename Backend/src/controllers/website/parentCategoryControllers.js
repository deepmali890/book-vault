const BookCategory = require("../../models/bookCategory");
const ParentCategory = require("../../models/parentCategory");

const activeParentCategoryWeb = async (req, res) => {
    try {
        const response = await ParentCategory.find({ deleted_at: null, status: true });

        const data = await Promise.all(
            response.map(async (category) => {
                const productcategories = await BookCategory.find({ parent_categories: category._id });
                // console.log(productcategories)
                // category["subCategories"] = productcategories; // Attach subcategories to the category object
                return {...category._doc, subCategories:productcategories};
            })
        );
        
        // console.log(data);
        
        res.status(200).json({ message: 'success', data })
// 
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}
module.exports = {
    activeParentCategoryWeb
}