import { useState } from "react";

import StackNavigator from "./StackNavigator/StackNavigator";
import TabNavigator from "./StackNavigator/TabNavigator";

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <>
      {isLoggedIn ? (
        <TabNavigator /> 
      ) : (
        <StackNavigator setIsLoggedIn={setIsLoggedIn}/>
      )}
    </>
  );
}