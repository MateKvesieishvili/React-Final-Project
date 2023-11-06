import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from "../../helpers"

export const authenticateUser = createAsyncThunk(
    "user/authenticateUser",
    async ({formValues}, {rejectWithValue}) => {
        try {
            const endpoint = "/users/register"
            const {data} = await axiosInstance.post(endpoint, formValues)
            console.log("data:", data)
            return data
        } catch (error) {
            return rejectWithValue(error?.response?.data?.message)
        }
    }
)

const userSlice = createSlice({
    name: "user",
    initialState: {
        loading: true,
        error: null,
        userData: null,
    },
    extraReducers: (builder) => {
        builder.addCase(authenticateUser.pending, (state)=>{
            state.loading = true
        })   
        builder.addCase(authenticateUser.fulfilled, (state, action) => {
            state.loading = false
            state.userData = action.payload.user
            state.error = null
        }) 
        builder.addCase(authenticateUser.rejected, (state, action)=>{
            state.loading = false
            state.error = action.payload
        })
    }
})

export const userReducer = userSlice.reducer
