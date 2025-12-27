import { useState } from "react";
import StackNavigator from "./StackNavigator/StackNavigator";
import TabNavigator from "./StackNavigator/TabNavigator";
import { Provider } from 'react-redux';
import { store } from '../src/store/index';

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
    <Provider store={store}>
    <RecipeProvider>
      {user ? (
        <TabNavigator /> 
      ) : (
        <StackNavigator setUser={setUser}/>
      )}
    </RecipeProvider>
    </Provider>
    </AuthContext.Provider>
  );
}
