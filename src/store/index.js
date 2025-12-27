import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './slices/foodSlice';
import authReducer from './slices/authSlice';
import recipeReducer from './slices/recipeSlice';

export const store = configureStore({
  reducer: {
    food: foodReducer,
    auth: authReducer,
    recipes: recipeReducer
  },
});