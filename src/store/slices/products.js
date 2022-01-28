import { createSlice } from '@reduxjs/toolkit';
import { loadState } from 'utils/localStorage';

// Demo Data
import ProductData from 'data/Data.json';

// Load Saved State from Local Storage
const persistedState = loadState();

// Product Slice
const productsSlice = createSlice({
  name: 'products',
  initialState: persistedState.products || {
    products: ProductData,
    selected: null,
    bookings: [],
  },
  reducers: {
    // Get Single Product
    getProductById: (state, action) => {
      let { id } = action.payload;
      let selected = state.products.find((item) => item.code === id);
      state.selected = selected;
    },
    // Get Single Product from Booking List
    getBookingProductById: (state, action) => {
      let { id } = action.payload;
      let selected = state.bookings.find((item) => item.code === id);
      state.selected = selected;
    },
    // Price Calc
    getCalculatedPrice: (state, action) => {
      let { days, date } = action.payload;
      // Check existance
      let estPrice = days * state.selected.price;

      state.selected.estPrice = estPrice;
      state.selected.bookingsDays = days;
      state.selected.bookingsDates = date;
    },

    // Update Selected
    updateSelected: (state, action) => {
      let { mileage, code } = action.payload;
      if (code) {
        state.selected = state.bookings.find((item) => item.code === code);
      } else {
        state.selected.mileageUsed = mileage;
      }
    },
    // Reset Selected
    resetSelected: (state) => {
      state.selected = null;
    },
    // Add to bookings
    productBooking: (state) => {
      let index = state.products.findIndex(
        (item) => item.code === state.selected.code
      );
      if (index !== -1) {
        state.products[index].availability = false;
        state.selected.availability = false;
        state.bookings.push(state.selected);
        state.selected = null;
      }
    },
    returnProduct: (state) => {
      let mainIndex = state.products.findIndex(
        (item) => item.code === state.selected.code
      );
      let index = state.bookings.findIndex(
        (item) => item.code === state.selected.code
      );
      if (index !== -1) {
        state.products[mainIndex].availability = true;
        state.bookings.splice(index, 1);
        state.selected = null;
      }
    },
    updateProducts: (state, action) => {
      let { date } = action.payload;
      console.log(date);

      // Mileage

      // Durability

      // Need to fix or not
    },
  },
});

const productsReducer = productsSlice.reducer;
export default productsReducer;
