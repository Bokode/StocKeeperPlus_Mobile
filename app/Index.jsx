import { useState } from "react";
import StackNavigator from "./StackNavigator/StackNavigator";
import TabNavigator from "./StackNavigator/TabNavigator";
import { FoodProvider } from "./context/foodContext";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <FoodProvider>
      {isLoggedIn ? (
        <TabNavigator /> 
      ) : (
        <StackNavigator setIsLoggedIn={setIsLoggedIn}/>
      )}
    </FoodProvider>
  );
}
