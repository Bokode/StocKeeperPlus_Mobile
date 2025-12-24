import { useState } from "react";
import StackNavigator from "./StackNavigator/StackNavigator";
import TabNavigator from "./StackNavigator/TabNavigator";
import { FoodProvider } from "./context/foodContext";
import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
import { useNotifications } from "../src/utils/useNotifications";

const messaging = getMessaging();

setBackgroundMessageHandler(messaging, async () => {});

export default function App() {

  useNotifications("admin@test.com");

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
