import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const fatchBookByParentCategory = createAsyncThunk(
    'bookByParentCategory/fatchBookByParentCategory',
    async (categoryName, thunkApi) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/books/book-by-parent-category/${categoryName}`)
            return response.data;

        }
        catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)

        }
    }
)
export const bookByParentCategorySlice = createSlice({
    name: "bookByParentCategory",
    initialState: {
        value: {},
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fatchBookByParentCategory.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            
        })
        .addCase(fatchBookByParentCategory.fulfilled,(state,action)=>{
            state.value = action.payload;
            state.loading = false
        })
        .addCase(fatchBookByParentCategory.rejected,(state,action)=>{
            state.error = action.payload;
            state.loading = false
            console.log("error => ", action.payload)
        })
    }
})

// export const { setParentCAtegory } = bookByParentCategorySlice.actions

export default bookByParentCategorySlice.reducer