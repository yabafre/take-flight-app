import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@app/store/reducers/auth/authSlice';
import {searchReducer} from '@app/store/reducers/search/searchSlice';
import logger from 'redux-logger'


const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
          serializableCheck: false,
      }).concat(logger),
  devTools: true,
});

export default store;
