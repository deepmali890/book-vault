'use client'
import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const fatchSlider = createAsyncThunk(
    'slider/fatchSlider',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/slider-web/read-slder-web`)
            // console.log("jai hanuman",response.data)
            return response.data;

        }
        catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)

        }
    }
)
export const sliderSlice = createSlice({
    name: "slider",
    initialState: {
        value: {},
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fatchSlider.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            
        })
        .addCase(fatchSlider.fulfilled,(state,action)=>{
            state.value = action.payload;
            state.loading = false
        })
        .addCase(fatchSlider.rejected,(state,action)=>{
            state.error = action.payload;
            state.loading = false
            console.log("error => ", action.payload)
        })
    }
})

// export const { setParentCAtegory } = bookByParentCategorySlice.actions

export default sliderSlice.reducer