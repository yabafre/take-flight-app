import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flights: null,
  hotels: null,
  flightSearchParams: {},
  hotelSearchParams: {},
  selectedFlight: null,
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
  setFlightSearchParams,
  setHotelSearchParams,
  setStatus,
  setError,
} = searchSlice.actions;

export const searchReducer = searchSlice.reducer;
