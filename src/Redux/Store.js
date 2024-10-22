import { configureStore } from "@reduxjs/toolkit";
import { listingSlice } from "./Slices/listingSlice";
import { addUserSlice } from "./Slices/addSlice";
import { editCandidateSlice } from "./Slices/editSlice";


export  const store= configureStore({
reducer:{
Listing:listingSlice.reducer,
 AddUser:addUserSlice.reducer,
 EditUser:editCandidateSlice.reducer

   
   
}
    
});