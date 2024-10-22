import { createSlice } from "@reduxjs/toolkit"; 
import  {createAsyncThunk}  from "@reduxjs/toolkit";
import config from '../Config.json'
 const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vc3RhZ2Uuam9ic2luZ3RhLmNvbS9hcGkvYWRtaW4vbG9naW4iLCJpYXQiOjE3Mjk2MDEyMjUsImV4cCI6MTczMjIzMTAyNSwibmJmIjoxNzI5NjAxMjI1LCJqdGkiOiI2cm9ZUVpha21oMHY4TVByIiwic3ViIjoiMTg1ODkiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.G-MieWAdDcxsmRQv76HBG8_dUjG5U_-CQkXa-T-1GKk";
const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }, 
  };
//Action
export const fetchEditCandidate= createAsyncThunk("fetchEditCandidate",async (id)=>{
    const response = await fetch(`${config.apiUrl}/api/candidates/view/${id}`,headers);
    return response.json();
})
 export const editCandidateSlice = createSlice({
  name: 'editCandidate',
  initialState: {
    editData: null,
    isLoading: false, 
    error: null,               
},    
  reducers: {},
  extraReducers: (builder) => {
    builder     
      .addCase(fetchEditCandidate.pending, (state,action) => {
        state.isLoading = true;
      })
      .addCase(fetchEditCandidate.fulfilled, (state, action) => {
        state.isLoading = false;
        state.status = false; 
        state.editData = action.payload;
        console.log("action",action) 
      })
      .addCase(fetchEditCandidate.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
    });
  },
});

