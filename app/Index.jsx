import { useState } from "react";
import StackNavigator from "./StackNavigator/StackNavigator";
import TabNavigator from "./StackNavigator/TabNavigator";
import { FoodProvider } from "./context/foodContext";
//import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
//import { useNotifications } from "../src/utils/useNotifications";
import { RecipeProvider } from "./context/recipeContext";
import { AuthContext } from "./context/authContext";

//const messaging = getMessaging();

//setBackgroundMessageHandler(messaging, async () => {});

export default function App() {

  

  const [user, setUser] = useState(null);

  //useNotifications(user);

  return (
    <AuthContext.Provider value={{setUser}}>
    <FoodProvider>
    <RecipeProvider>
      {user ? (
        <TabNavigator /> 
      ) : (
        <StackNavigator setUser={setUser}/>
      )}
    </RecipeProvider>
    </FoodProvider>
    </AuthContext.Provider>
  );
}
