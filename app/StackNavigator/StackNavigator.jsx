import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/login/login/loginScreen"

const Stack = createNativeStackNavigator();

export default function StackNavigator({ setIsLoggedIn }) {
  return (
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
}