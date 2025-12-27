import { configureStore } from '@reduxjs/toolkit';
import foodReducer from './slices/foodSlice';
import recipeReducer from './slices/recipeSlice';

export const store = configureStore({
  reducer: {
    food: foodReducer,
    recipe: recipeReducer
  },
});