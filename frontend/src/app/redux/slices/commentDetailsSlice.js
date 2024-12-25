import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




// create action

export const createComment = createAsyncThunk(
    "user/createComment",
    async (data, thunkApi) => {
        try {
            const response = await axios.post(`https://676bacb8bc36a202bb853eac.mockapi.io/crud`,{data})
            // console.log("jai hanuman",response.data)
            return response.data;

        }
        catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)

        }
    }
)





export const showComment = createAsyncThunk(
    "comment/showComment",
    async (_, thunkApi) => {
        try {
            const response = await axios.get('https://676bacb8bc36a202bb853eac.mockapi.io/crud')
            // console.log("jai hanuman",response.data)
            return response.data;

        }
        catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)

        }
    }
)

export const commentSlice = createSlice({
    name: "comment",
    initialState: {
        user: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createComment.pending, (state, action) => {
                state.loading = true;
                state.error = null
            })
            .addCase(createComment.fulfilled, (state, action) => {
                state.comments.push (action.payload);
                state.loading = false;
                state.error = null
            })
            .addCase(createComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            .addCase(showComment.pending, (state, action) => {
                state.loading = true;
                state.error = null
            })
            .addCase(showComment.fulfilled, (state, action) => {
                state.comments = action.payload;
                state.loading = false;
                state.error = null
            })
            .addCase(showComment.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }

})


export default commentSlice.reducer;