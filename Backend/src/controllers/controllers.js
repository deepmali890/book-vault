
// Admin 

// Parent Category
const {
    createParentCategory,
    readParentCategory,
    updateStatus,
    deleteParentCategory,
    deletedCategory,
    PermanentdeleteParentCategory,
    parentCategoryByID,
    upadateCategory,
    multideleteCategory,
    restoreCategory,
    activeParentCategory
} = require("./admin/parentCAtegoryControllers");


// book category 
const {
    createBookCategory,
    readBookCategory,
    updateBookCategoryStatus,
    updateCategoryFeature,
    deleteBookcategory,
    BookCategoryById,
    updateBookCategory,
    deletedcategory,
    restoreBookCategory,
    PermanentdeleteCategory,
    multiDeleteBookCategory,
    activeBookCategory
} = require("./admin/bookCategory");

// author 
const {
    createAuthor,
    readAuthor,
    updateAuthorStatus,
    deleteAuthor,
    AuthorById,
    updateAuthor,
    deletedAuthor,
    restoreAuthor,
    PermanentdeleteAuthor,
    multiDeleteAuthor,
    activeAuthor
} = require("./admin/author");


// books
const { cretaebook,
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
} = require("./admin/book");


// slider
const { createSlider,
    readSlider,
    updateSliderStatus,
    deleteSlider,
    sliderById,
    updateSlider,
    deletedSlider,
    restoreSlider,
    PermanentdeleteSlider,
    multideleteSlider } = require("./admin/slider");

// story
const { createStory,
    readStory,
    updateStoryStatus,
    deleteStory,
    storyById,
    updateStory,
    deletedStory,
    restoreStory,
    PermanentdeleteStory,
    multiDeleteStory
} = require("./admin/story");



// website 


// parent Category
const { activeParentCategoryWeb } = require("./website/parentCategoryControllers");
const { readBookByParentCategoryWeb } = require("./website/bookByParentCategory");
const { activeAuthorWeb } = require("./website/author");
const { createInquire, readInquire } = require("./website/inquire");
const { createBlog, readBlog, updateBlogStatus } = require("./admin/blog");
const { readBlogWeb } = require("./website/blog");
const { activeBookCategoryForWeb } = require("./website/bookCategory");
const { readBookWeb } = require("./website/bookControllers");
const { cretaeTeam, readTeam } = require("./admin/team");

module.exports = {
    createParentCategory,
    readParentCategory,
    updateStatus,
    deleteParentCategory,
    multideleteCategory,
    deletedCategory,
    PermanentdeleteParentCategory,
    parentCategoryByID,
    upadateCategory,
    restoreCategory,
    createBookCategory,
    activeParentCategory,
    readBookCategory,
    updateBookCategoryStatus,
    updateCategoryFeature,
    deleteBookcategory,
    BookCategoryById,
    updateBookCategory,
    deletedcategory,
    restoreBookCategory,
    PermanentdeleteCategory,
    multiDeleteBookCategory,
    createAuthor,
    readAuthor,
    updateAuthorStatus,
    deleteAuthor,
    AuthorById,
    updateAuthor,
    deletedAuthor,
    restoreAuthor,
    PermanentdeleteAuthor,
    multiDeleteAuthor,
    cretaebook,
    activeBookCategory,
    activeAuthor,
    readBook,
    updateBookStatus,
    updateBookType,
    deleteBook,
    bookById,
    updateBook,
    deletedBook,
    PermanentdeleteBook,
    restoreBook,
    manyDeleteBook,
    createSlider,
    readSlider,
    updateSliderStatus,
    deleteSlider,
    sliderById,
    updateSlider,
    deletedSlider,
    restoreSlider,
    PermanentdeleteSlider,
    multideleteSlider,
    createStory,
    readStory,
    updateStoryStatus,
    deleteStory,
    storyById,
    updateStory,
    deletedStory,
    restoreStory,
    PermanentdeleteStory,
    multiDeleteStory,
    activeParentCategoryWeb,
    readBookByParentCategoryWeb,
    activeAuthorWeb,
    createInquire,
    readInquire,
    createBlog,
    readBlog,
    readBlogWeb,
    updateBlogStatus,
    activeBookCategoryForWeb,
    readBookWeb,
    cretaeTeam,
    readTeam
    
}