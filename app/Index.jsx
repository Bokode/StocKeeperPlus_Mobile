import { useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import LoginScreen from "./StackNavigator/LoginScreen";
import TabNavigator from "./StackNavigator/TabNavigator";

const Stack = createNativeStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const AuthStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => (
          <LoginScreen
            {...props}
            onLoginSuccess={() => setIsLoggedIn(true)}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );

  return (
    <>
      {isLoggedIn ? <TabNavigator /> : <AuthStack />}
    </>
  );
}