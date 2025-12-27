import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_URL } from '../../../app/config/config';

export const fetchRecipes = createAsyncThunk(
  'recipes/fetchRecipes',
  async () => {
    const response = await fetch(`${BASE_URL}/recipe/all`);
    const data = await response.json();
    return data;
  }
);

export const loadFavorites = createAsyncThunk(
  'recipes/loadFavorites',
  async () => {
    const saved = await AsyncStorage.getItem('recipe_favorites');
    return saved ? JSON.parse(saved) : [];
  }
);

export const toggleFavorite = createAsyncThunk(
  'recipes/toggleFavorite',
  async (recipeId, { getState }) => {
    const { favorites } = getState().recipes;
    
    let newFavorites;
    if (favorites.includes(recipeId)) {
      newFavorites = favorites.filter(id => id !== recipeId);
    } else {
      newFavorites = [...favorites, recipeId];
    }

    await AsyncStorage.setItem('recipe_favorites', JSON.stringify(newFavorites));
    return newFavorites;
  }
);

const recipeSlice = createSlice({
  name: 'recipes',
  initialState: {
    list: [],
    favorites: [],
    loading: false,
    error: null,
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecipes.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRecipes.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload;
      })
      .addCase(fetchRecipes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(loadFavorites.fulfilled, (state, action) => {
        state.favorites = action.payload;
      })
      .addCase(toggleFavorite.fulfilled, (state, action) => {
        state.favorites = action.payload;
      });
  },
});

export default recipeSlice.reducer;