'use client'
import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const fatchparentCategory = createAsyncThunk(
    'parentCategory/fatchparentCategory',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/parent-category-web/active-category`)
            // console.log("parent", response.data)
            return response.data.data;

        }
        catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)

        }
    }
)
export const parentCategorySlice = createSlice({
    name: "parentCategory",
    initialState: {
        value: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fatchparentCategory.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            
        })
        .addCase(fatchparentCategory.fulfilled,(state,action)=>{
            state.value = action.payload;
            state.loading = false
        })
        .addCase(fatchparentCategory.rejected,(state,action)=>{
            state.error = action.payload;
            state.loading = false
            console.log("error => ", action.payload)
        })
    }
})

// export const { setParentCAtegory } = parentCategorySlice.actions

export default parentCategorySlice.reducer