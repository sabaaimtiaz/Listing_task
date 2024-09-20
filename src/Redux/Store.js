import { configureStore } from "@reduxjs/toolkit";
import { listingSlice } from "./Slices/listingSlice";




export  const store= configureStore({
reducer:{
Listing:listingSlice.reducer,
   
   
}
    
});