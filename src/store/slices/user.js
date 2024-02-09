import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "user",
  initialState: {
    services: [],
    warrantyCards: [],
    currentService: [],
    refresh: Math.floor(Math.random() * 99999)
  },
  reducers: {
    setServices: (s, a) => {
      s.services = a.payload;
    },
    setWarrantyCards: (s, a) => {
      s.warrantyCards = a.payload;
    },
    setCurrentService: (s, a) => {
      s.currentService = a.payload;
    },
    doRefresh: (s, a) => {
      s.refresh = a.payload
    }
  },
});


export const { 
    setServices, 
    setWarrantyCards, 
    setCurrentService,
    doRefresh
} = slice.actions;
export default slice.reducer;
