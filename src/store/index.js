import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './slices/foodSlice';
import authReducer from './slices/authSlice';

export const store = configureStore({
  reducer: {
    food: foodReducer,
    auth: authReducer,
  },
});
