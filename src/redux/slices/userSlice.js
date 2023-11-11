import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {axiosInstance} from "../../helpers"

export const authenticateUser = createAsyncThunk(
    "user/authenticateUser",
    async ({formValues, isLogin}, {rejectWithValue}) => {
        try {
            const endpoint = `/users/${isLogin ? "login" : "register"}`
            const {data} = await axiosInstance.post(endpoint, formValues)
            localStorage.setItem("token", data.token)
            localStorage.setItem("refresh_token", data.refreshToken)
            console.log("data:", data)
            return data
        } catch (error) {
            console.log("error:", error)
            return rejectWithValue(error?.message)
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
