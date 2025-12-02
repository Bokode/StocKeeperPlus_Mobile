
import CalendarScreen from "./Screens/calendar";
import HomeScreen from "./Screens/home";
import MapScreen from "./Screens/map";
import RecipeScreen from "./Screens/recipe";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

export default function Index() {
  return (
      <Tab.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="RecipeScreen" component={RecipeScreen} />
        <Tab.Screen name="MapScreen" component={MapScreen} />
        <Tab.Screen name="CalendarScreen" component={CalendarScreen} />
      </Tab.Navigator>
  );
}