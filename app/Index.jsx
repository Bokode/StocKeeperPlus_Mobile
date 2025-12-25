import { useState } from "react";
import StackNavigator from "./StackNavigator/StackNavigator";
import TabNavigator from "./StackNavigator/TabNavigator";
import { FoodProvider } from "./context/foodContext";
//import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
//import { useNotifications } from "../src/utils/useNotifications";
import { AuthContext } from "./context/authContext";

//const messaging = getMessaging();

//setBackgroundMessageHandler(messaging, async () => {});

export default function App() {

  

  const [user, setUser] = useState(null);

  //useNotifications(user);

  return (
    <AuthContext.Provider value={{setUser}}>
    <FoodProvider>
      {user ? (
        <TabNavigator /> 
      ) : (
        <StackNavigator setUser={setUser}/>
      )}
    </FoodProvider>
    </AuthContext.Provider>
  );
}
