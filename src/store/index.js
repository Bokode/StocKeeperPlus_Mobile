import { configureStore } from '@reduxjs/toolkit';
import recipeReducer from './slices/recipeSlice';
// import foodReducer from './slices/foodSlice'; // À décommenter quand tu auras fait le foodSlice

export const store = configureStore({
  reducer: {
    recipes: recipeReducer,
    // food: foodReducer, 
  },
  // middleware est géré automatiquement par toolkit par défaut
});