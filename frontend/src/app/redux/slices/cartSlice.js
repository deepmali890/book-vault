import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const addCart = createAsyncThunk(
    "cart/addCart",
    async (data, thunkApi) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/create-cart`,data)
            return response.data;

        }
        catch (error) {
            console.log(error);


        }
    }
)

const initialState = {
    value: {},
    loading: false,
    error: null,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(addCart.pending, (state, action) => {
                state.loading = true;
                state.error = null;

            })
            .addCase(addCart.fulfilled, (state, action) => {
                state.value = action.payload;
                state.loading = false
            })
            .addCase(addCart.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false
                console.log("error => ", action.payload)
            })
    }
})

export default cartSlice.reducer