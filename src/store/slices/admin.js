import { createSlice } from "@reduxjs/toolkit";
import { useFetchToken } from "../../utils/fetch";

const slice = createSlice({
  name: "admin",
  initialState: {
    token: useFetchToken().token,
    services: [],
    priceList: [],
    warrantyCards: [],
  },
  reducers: {
    setToken: (s, a) => {
      s.token = a.payload;
    },
    setServices: (s, a) => {
      s.services = a.payload;
    },
    deleteService: (s, a) => {
      var temp = s.services.filter((service) => service.ID !== a.payload);
      s.services = temp;
    },
    setPriceList: (s, a) => {
      s.priceList = a.payload;
    },
    deleteProduct: (s, a) => {
      var temp = s.priceList.filter((product) => product.ID !== a.payload);
      s.priceList = temp;
    },
    updateProduct: (s, a) => {
      var temp = s.priceList;
      temp.map((product, i) => {
        if(product.ID === a.payload.ID) {
          temp.splice(i, 1, a.payload)
        }
      })
      s.priceList = temp;
    },    
    setWarrantyCards: (s, a) => {
      s.warrantyCards = a.payload;
    },
  },
});

export const {
  setToken,
  setServices,
  deleteService,
  setPriceList,
  updateProduct,
  deleteProduct,
  setWarrantyCards,
} = slice.actions;
export default slice.reducer;
