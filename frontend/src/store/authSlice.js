import { createSlice ,createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../lib/axios';


export const login = createAsyncThunk('/auth/login',
  async (credential , {rejectWithValue})=>{
    try {
      const response = await axiosInstance.post('/auth/login' ,credential)
      return response.data;
    } catch (error) {
      return rejectWithValue(error?.response?.data?.message || 'failed to login')
    }
  }
)

export const signup = createAsyncThunk('/auth/signup',
  async (credential , {rejectWithValue})=>{
    try {
      const response = await axiosInstance.post('/auth/login',credential);
      return response.data;
    } catch (error) {
            return rejectWithValue(error?.response?.data?.message || 'failed to signup')

    }
  }
)

const initialState = {
  user: null,
 
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers:(builder)=>{
    builder
    .addCase(login.fulfilled ,(state , action)=>{
      state.user=action.payload
     
    })
    .addCase(signup.fulfilled,(state,action)=>{
      state.user=action.payload
    })
  }
});

export default authSlice.reducer;
