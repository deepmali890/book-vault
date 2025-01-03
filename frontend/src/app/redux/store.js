'use client'
import { configureStore } from '@reduxjs/toolkit'
import parentCategorySlice from './slices/parentCategorySlice'
import bookByParentCategorySlice from './slices/bookByParentCategory'
import authorSlice from './slices/authorSlice'
import blogSlice from './slices/blogSlice'
import featureBookCategorySlice from './slices/featureBookCategorySlice'
import booksSlice from './slices/allBooksSlice'
import cartSlice from './slices/cartSlice'
import commentSlice from './slices/commentDetailsSlice'
import sliderSlice from './slices/sliderSlice'


export const store = configureStore({
  reducer: {
    // Add your reducers here
    parentCategory: parentCategorySlice,
    bookByParentCategory: bookByParentCategorySlice,
    author: authorSlice,
    blog: blogSlice,
    featureBook: featureBookCategorySlice,
    allBooks: booksSlice,
    cart: cartSlice,
    app: commentSlice,
    slider: sliderSlice
  },
})