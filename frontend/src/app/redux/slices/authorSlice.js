import axios from "axios";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


export const fatchAuthor = createAsyncThunk(
    'author/fatchAuthor',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/author/read_author`)
            // console.log("jai hanuman",response.data)
            return response.data;

        }
        catch (error) {
            console.log(error)
            return thunkApi.rejectWithValue(error.message)

        }
    }
)
export const authorSlice = createSlice({
    name: "author",
    initialState: {
        value: {},
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fatchAuthor.pending,(state,action)=>{
            state.loading = true;
            state.error = null;
            
        })
        .addCase(fatchAuthor.fulfilled,(state,action)=>{
            state.value = action.payload;
            state.loading = false
        })
        .addCase(fatchAuthor.rejected,(state,action)=>{
            state.error = action.payload;
            state.loading = false
            console.log("error => ", action.payload)
        })
    }
})

// export const { setParentCAtegory } = bookByParentCategorySlice.actions

export default authorSlice.reducer