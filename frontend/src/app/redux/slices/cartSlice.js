import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
// export const addCart = createAsyncThunk(
//     "cart/addCart",
//     async (data, thunkApi) => {
//         try {
//             const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cart/create-cart`, data);
//             return response.data; 
//         } catch (error) {
//          
//             return thunkApi.rejectWithValue(error.response?.data || error.message || 'Something went wrong');
//         }
//     }
// );

export const fatchCart = createAsyncThunk(
    "cart/fatchCart",
    async (id, thunkApi) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cart/read-cart/${id}`);
       
            return response.data; // return only necessary data from the API response
        } catch (error) {
            console.log(error);
            // Return error message instead of the whole error object
            return thunkApi.rejectWithValue(error.response?.data || error.message || 'Something went wrong');
        }
    }
);

// Initial State
const initialState = {
    value: {},
    loading: false,
    error: null,
};

// Cart Slice
export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Add case for addCart.pending to handle loading state
            // .addCase(addCart.pending, (state) => {
            //     state.loading = true;
            //     state.error = null; // Clear previous errors
            // })
            // // Handle addCart.fulfilled (successful API response)
            // .addCase(addCart.fulfilled, (state, action) => {
            //     console.log("Cart response:", action.payload);
            //     state.value = action.payload;  // Update cart data
            //     state.loading = false;
            // })
            // // Handle addCart.rejected (failed API response)
            // .addCase(addCart.rejected, (state, action) => {
            //     state.loading = false;
            //     state.error = action.payload;  // Store the error message
            //     console.error("Error in addCart:", action.payload);
            // })
            // Add case for fatchCart.pending to handle loading state
            .addCase(fatchCart.pending, (state) => {
                state.loading = true;
                state.error = null; // Clear previous errors
            })
            // Handle fatchCart.fulfilled (successful API response)
            .addCase(fatchCart.fulfilled, (state, action) => {
                // console.log("Cart response:", action.payload);
                state.value = action.payload;  // Update cart data
                state.loading = false;
            })
            // Handle fatchCart.rejected (failed API response)
            .addCase(fatchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;  // Store the error message
                console.error("Error in fatchCart:", action.payload);
            });
    },
});

export default cartSlice.reducer;
