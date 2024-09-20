import { createSlice } from "@reduxjs/toolkit"; 
import  {createAsyncThunk}  from "@reduxjs/toolkit";
import config from '../Config.json'
 const token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOi8vc3RhZ2Uuam9ic2luZ3RhLmNvbS9hcGkvYWRtaW4vbG9naW4iLCJpYXQiOjE3MjY3NjYyNDQsImV4cCI6MTcyOTM5NjA0NCwibmJmIjoxNzI2NzY2MjQ0LCJqdGkiOiJFYThGeDFBaHpzcFlBbVBDIiwic3ViIjoiMTg2MzQiLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.WIfjfk36VYk1xQamMUSWbjuag0cRFbJjd8OE0Y7_mGs";
const headers = {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`
    }, 
  };

//Action
export const fetchListing= createAsyncThunk("fetchListing",async (data)=>{
    const response = await fetch(`${config.apiUrl}/api/candidates/list?search=${data.search}&numberPerPage=${data.numberPerPage}&skip=${data.skip}&agency_type=2&category=`,headers);
    return response.json();
})
 export const listingSlice = createSlice({
  name: 'listing',
  initialState: {
    data: [],
    name: '',
    status: 'idle',
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchListing.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchListing.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload; 
        // console.log("action",action) 
      })
      .addCase(fetchListing.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

