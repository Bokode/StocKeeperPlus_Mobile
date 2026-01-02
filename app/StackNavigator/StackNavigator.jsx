import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../Screens/login/login/loginScreen"
import CreateAccount from "../Screens/login/createAccount/createAccount";

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login">
        {(props) => (
          <LoginScreen
            {...props}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="CreateAccount">
        {(props) => (
          <CreateAccount
            {...props}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}