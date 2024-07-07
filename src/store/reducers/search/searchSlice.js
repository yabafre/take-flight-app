import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flights: null,
  hotels: null,
  flightSearchParams: {},
  hotelSearchParams: {},
  selectedFlight: null,
  flightPricingData: null,
  allInclusiveParams: {},
  allInclusiveData: null,
  status: 'idle',
  error: null,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setFlights: (state, action) => {
      state.flights = action.payload;
    },
    setHotels: (state, action) => {
      state.hotels = action.payload;
    },
    setFlightSearchParams: (state, action) => {
      state.flightSearchParams = action.payload;
    },
    setHotelSearchParams: (state, action) => {
      state.hotelSearchParams = action.payload;
    },
    setSelectedFlight: (state, action) => {
      state.selectedFlight = action.payload;
    },
    setflightPricingData: (state, action) => {
      state.flightPricingData = action.payload;
    },
    setAllInclusiveParams: (state, action) => {
      state.allInclusiveParams = action.payload;
    },
    setAllInclusiveData: (state, action) => {
      state.allInclusiveData = action.payload;
    },
    setStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setFlights,
  setHotels,
  setSelectedFlight,
  setflightPricingData,
  setFlightSearchParams,
  setHotelSearchParams,
  setAllInclusiveParams,
  setAllInclusiveData,
  setStatus,
  setError,
} = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
