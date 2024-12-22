'use client'
import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const featureBookCategory = createAsyncThunk(
    'featurebookcategory/featureBookCategory',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/read-bookCategory-feature/read-book-category`)
            // console.log("jai hanuman",response.data)
            return response.data;

        }
        catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)

        }
    }
)
export const featureBookCategorySlice = createSlice({
    name: "featurebookcategory",
    initialState: {
        value: {},
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(featureBookCategory.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            
        })
        .addCase(featureBookCategory.fulfilled,(state,action)=>{
            state.value = action.payload;
            state.loading = false
        })
        .addCase(featureBookCategory.rejected,(state,action)=>{
            state.error = action.payload;
            state.loading = false
            console.log("error => ", action.payload)
        })
    }
})

// export const { setParentCAtegory } = bookByParentCategorySlice.actions

export default featureBookCategorySlice.reducer