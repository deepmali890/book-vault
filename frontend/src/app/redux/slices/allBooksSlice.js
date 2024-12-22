import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const fatchBook = createAsyncThunk(
    'books/fatchBook',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/allbooks/read-books`)
            // console.log("jai hanuman",response.data)
            return response.data;

        }
        catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)

        }
    }
)
export const booksSlice = createSlice({
    name: "books",
    initialState: {
        value: {},
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fatchBook.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            
        })
        .addCase(fatchBook.fulfilled,(state,action)=>{
            state.value = action.payload;
            state.loading = false
        })
        .addCase(fatchBook.rejected,(state,action)=>{
            state.error = action.payload;
            state.loading = false
            console.log("error => ", action.payload)
        })
    }
})

// export const { setParentCAtegory } = bookByParentCategorySlice.actions

export default booksSlice.reducer