import { createSlice } from '@reduxjs/toolkit';
import { loadState } from 'utils/localStorage';
// Demo Data
import ProductData from 'data/Data.json';

// Load Saved State from Local Storage
const persistedState = loadState();

// Product Slice
const productsSlice = createSlice({
  name: 'products',
  initialState: persistedState
    ? persistedState.products
    : {
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
    // Price Calculation
    getCalculatedPrice: (state, action) => {
      let { days, period } = action.payload;
      // price * day - discount
      let estPrice =
        days * state.selected.price - (state.selected.discount || 0);

      state.selected.estPrice = estPrice;
      state.selected.bookingsDays = days;
      state.selected.bookingsDates = period;
    },

    // Update Selected
    updateSelected: (state, action) => {
      let { mileage } = action.payload;
      state.selected.mileageUsed = mileage;
    },
    // Reset Selected
    resetSelected: (state) => {
      state.selected = null;
    },
    // Booking
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
        state.products[mainIndex].mileage += state.selected.mileageUsed;
        state.bookings.splice(index, 1);
        state.selected = null;
      }
    },
    // Every day booking product update
    updateProducts: (state, action) => {
      let { today } = action.payload;

      // Main function
      const update = (item, nthDay = 1) => {
        // Mileage update
        item.mileage += 10 * nthDay;
        // Durability update
        if (item.type === 'plain') {
          item.durability -= 1 * nthDay;
        } else {
          item.durability -= 2 * nthDay;
        }
        // Need to fix or not
        if (item.durability >= item.max_durability) {
          item.needing_repair = true;
        }
        return item;
      };

      // Date difference mesurement function
      const dateDiff = (day1, day2) => {
        const date1 = new Date(day1);
        const date2 = new Date(day2);
        const diffTime = Math.abs(date2 - date1);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        return diffDays;
      };

      // Main Product Db update
      const mainProductUpdate = (m, d, r, code) => {
        const mainIndex = state.products.findIndex(
          (mainItem) => mainItem.code === code
        );
        const targetProduct = state.products[mainIndex];
        targetProduct.durability = d;
        targetProduct.needing_repair = r;
        targetProduct.mileage = m;
      };
      // Check all booked products
      // Mileage update
      // Durability update
      // Need to fix or not
      state.bookings.map((item) => {
        if (item.lastUpdate) {
          const lastUpdate = item.lastUpdate;
          // Check diff from last update (today-lastupdate)
          let dif = dateDiff(lastUpdate, today);
          let { mileage, durability, needing_repair } = update(item, dif);

          item.mileage = mileage;
          item.durability = durability;
          item.needing_repair = needing_repair;

          // update main db
          mainProductUpdate(mileage, durability, needing_repair, item.code);
        } else {
          // First update
          // Check diff from booking day (today-rentday)
          let bookDay = item.bookingsDates[0];
          let dif = dateDiff(bookDay, today);
          let { mileage, durability, needing_repair } = update(item, dif);

          item.mileage = mileage;
          item.durability = durability;
          item.needing_repair = needing_repair;
          item.lastUpdate = today;

          // update main db
          mainProductUpdate(mileage, durability, needing_repair, item.code);
        }
      });
    },
  },
});

const productsReducer = productsSlice.reducer;
export default productsReducer;
