import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@app/store/auth/authSlice';
// Importez les autres réducteurs ici

const store = configureStore({
  reducer: {
    auth: authReducer,
    // Ajoutez les autres réducteurs ici
  },
});

export default store;
