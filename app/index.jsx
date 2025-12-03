
import CalendarScreen from "./Screens/calendar";
import HomeScreen from "./Screens/home";
import MapScreen from "./Screens/Map/map";
import DetailsStore from "./Screens/Map/detailsStore";
import RecipeScreen from "./Screens/recipe";

import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MapStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapScreen" component={MapScreen} />
      <Stack.Screen name="DetailsStore" component={DetailsStore} />
    </Stack.Navigator>
  );
}

export default function Index() {
  return (
      <Tab.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="RecipeScreen" component={RecipeScreen} />
        <Tab.Screen name="Map" component={MapStack} options={{ tabBarIcon: ({ color, size }) => <Ionicons name="map" color={color} size={size} />, unmountOnBlur: true }} />
        <Tab.Screen name="CalendarScreen" component={CalendarScreen} />
      </Tab.Navigator>
  );
}