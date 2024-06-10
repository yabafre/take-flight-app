import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flights: [],
  hotels: [],
  searchParams: {
    flights: {
      originLocationCode: '',
      destinationLocationCode: '',
      departureDate: '',
      returnDate: '',
      adults: 1,
      children: 0,
      maxPrice: null,
      max: 10,
    },
    hotels: {
      cityCode: '',
      amenities: [],
      ratings: [],
      checkInDate: '',
      checkOutDate: '',
      roomQuantity: 1,
      adults: 1,
    },
  },
  status: 'idle',
  error: null,
  page: 1,
  totalPages: 1,
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setSearchParams(state, action) {
      state.searchParams[action.payload.type] = action.payload.params;
    },
    setResults(state, action) {
      state[action.payload.type] = action.payload.results;
    },
    setStatus(state, action) {
      state.status = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
  },
});

export const {
  setSearchParams,
  setResults,
  setStatus,
  setError,
  setPage,
  setTotalPages,
} = searchSlice.actions;

export default searchSlice.reducer;
