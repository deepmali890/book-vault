const Book = require("../../models/book");
const uploadToSupabase = require("../../utils/uploadToSupabase");

const cretaebook = async (req, res) => {
  try {
    const data = req.body;

    if (req.files) {
      if (req.files.frontimg) {
        data.frontimg = await uploadToSupabase(req.files.frontimg[0], "books/frontimg");
      }
      if (req.files.backimg) {
        data.backimg = await uploadToSupabase(req.files.backimg[0], "books/backimg");
      }
      if (req.files.pdf) {
        data.pdf = await uploadToSupabase(req.files.pdf[0], "books/pdf");
      }
      if (req.files.audio) {
        data.audio = await uploadToSupabase(req.files.audio[0], "books/audio");
      }
      if (req.files.multiAudio) {
        const audioUrls = await Promise.all(
          req.files.multiAudio.map(file => uploadToSupabase(file, "books/multiAudio"))
        );
        data.multiAudio = audioUrls;
      }
    }

    // Optional: Add validation here

    const newBook = new Book(data);
    const savedBook = await newBook.save();

    res.status(200).json({ message: "Book uploaded successfully", data: savedBook });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Something went wrong", error: error.message });
  }
};



const readBook = async (req, res) => {
    try {
        const data = await Book.find({ deleted_at: null })
            .populate('parent_categories', 'name description')
            .populate('book_category', 'name description')
            .populate('authors', 'name description')

        const filepath = `${req.protocol}://${req.get('host')}/book-files/`
        const pdfPath = `${req.protocol}://${req.get('host')}/book-files/pdfs/`;
        const audioPath = `${req.protocol}://${req.get('host')}/book-files/audio/`;


        console.log(data)
        res.status(200).json({ message: 'success', data, filepath, pdfPath, audioPath })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const updateBookStatus = async (req, res) => {
    try {
        const data = await Book.updateOne(
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

const updateBookType = async (req, res) => {
    try {
        const data = await Book.updateOne(
            req.params,
            {
                $set: {
                    status: req.body.type
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

const deleteBook = async (req, res) => {
    try {
        const data = await Book.updateOne(
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

const bookById = async (req, res) => {
    try {
        const response = await Book.findOne(req.params)
            .populate('parent_categories', 'name description')
            .populate('book_category', 'name description')
            .populate('authors', 'name description')

        res.status(200).json({ message: 'success', data: response })

    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const updateBook = async (req, res) => {
    try {
        const response = await Book.updateOne(
            req.params,
            {
                $set: req.body
            }
        )
        res.status(200).json({ message: 'success', data: response })
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const deletedBook = async (req, res) => {
    try {
        const response = await Book.find({ deleted_at: { $ne: null } })
        .populate('parent_categories', 'name description')
        .populate('book_category', 'name description')
        .populate('authors', 'name description')

        const filepath = `${req.protocol}://${req.get('host')}/book-files/`
     

             res.status(200).json({ message: 'success', data:response ,filepath })

    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const PermanentdeleteBook = async(req,res)=>{
    try {
        const data = await Book.deleteOne(req.params)
        res.status(200).json({ message: 'success', data })
        
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const restoreBook = async(req,res)=>{
    try {
        const response = await Book.updateOne(
            req.params,
            {
                $set:{
                    deleted_at: null
                }
            }
        )
        res.status(200).json({ message: 'success', data:response })
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

const manyDeleteBook = async(req,res)=>{
    try {
        const data = await Book.updateMany(
            { _id: { $in: req.body.ids } },
            { $set: { deleted_at: Date.now() } }
        )
        res.status(200).json({ message: 'success', data })
        
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({ message: 'internal Server Error' })

    }
}

module.exports = {
    cretaebook,
    readBook,
    updateBookStatus,
    updateBookType,
    deleteBook,
    bookById,
    updateBook,
    deletedBook,
    PermanentdeleteBook,
    restoreBook,
    manyDeleteBook
}