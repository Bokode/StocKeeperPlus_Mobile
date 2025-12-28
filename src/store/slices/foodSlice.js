import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  foodToShow: [],
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoodToShow: (state, action) => {
      state.foodToShow = action.payload;
    },
    addFoodToShow: (state, action) => {
      state.foodToShow.push(action.payload);
    },
    clearFoodToShow: (state) => {
      state.foodToShow = [];
    },
  },
});

export const { setFoodToShow, addFoodToShow, clearFoodToShow } = foodSlice.actions;

export default foodSlice.reducer;