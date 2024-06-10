import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@app/store/auth/authSlice';
import searchReducer from '@app/store/search/searchSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
});

export default store;
