import { useState } from "react";
import StackNavigator from "./StackNavigator/StackNavigator";
import TabNavigator from "./StackNavigator/TabNavigator";
import { Provider, useSelector } from 'react-redux';
import { store } from '../src/store/index';

//import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';
//import { useNotifications } from "../src/utils/useNotifications";

import { RecipeProvider } from "./context/recipeContext";
import { AuthContext } from "./context/authContext";

//const messaging = getMessaging();
//setBackgroundMessageHandler(messaging, async () => {});

// Nouveau composant intermédiaire pour gérer la logique qui dépend du Provider
function NavigationWrapper() {
  const user = useSelector((state) => state.auth.user);
  //useNotifications(user);
  
  return (
    <RecipeProvider>
      {user ? (
        <TabNavigator /> 
      ) : (
        <StackNavigator />
      )}
    </RecipeProvider>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <NavigationWrapper />
    </Provider>
  );
}