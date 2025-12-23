import React, { createContext, useState } from 'react';

export const FoodContext = createContext();

export const FoodProvider = ({ children }) => {
  const [foodToShow, setFoodToShow] = useState([]);

  return (
    <FoodContext.Provider value={{ foodToShow, setFoodToShow }}>
      {children}
    </FoodContext.Provider>
  );
};

export default FoodProvider;