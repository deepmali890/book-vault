import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const fatchBlog = createAsyncThunk(
    'blog/fatchBlog',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/blog-web/read-blog-web`)
            // console.log("jai hanuman",response.data)
            return response.data;

        }
        catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)

        }
    }
)
export const blogSlice = createSlice({
    name: "blog",
    initialState: {
        value: {},
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fatchBlog.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            
        })
        .addCase(fatchBlog.fulfilled,(state,action)=>{
            state.value = action.payload;
            state.loading = false
        })
        .addCase(fatchBlog.rejected,(state,action)=>{
            state.error = action.payload;
            state.loading = false
            console.log("error => ", action.payload)
        })
    }
})

// export const { setParentCAtegory } = bookByParentCategorySlice.actions

export default blogSlice.reducer