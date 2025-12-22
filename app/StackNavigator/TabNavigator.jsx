<<<<<<< HEAD:app/index.jsx
import CalendarScreen from "./Screens/calendar/calendar";
import HomeScreen from "./Screens/home/home";
import MapScreen from "./Screens/map";
import RecipeScreen from "./Screens/recipe";
import { useNotifications } from "../src/utils/useNotifications.js";
=======
import CalendarScreen from "../Screens/calendar/calendar";
import HomeScreen from "../Screens/home/homeScreen/home";
import MapScreen from "../Screens/map";
import RecipeScreen from "../Screens/recipeComponents/home/recipe";

>>>>>>> f4deeac2c7e7abc59288c9ee25b771ba821b4109:app/StackNavigator/TabNavigator.jsx
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { getMessaging, setBackgroundMessageHandler } from '@react-native-firebase/messaging';

const Tab = createBottomTabNavigator();

<<<<<<< HEAD:app/index.jsx
const messaging = getMessaging();

setBackgroundMessageHandler(messaging, async () => {});

export default function Index() {
  
  useNotifications("admin@test.com"); 

=======
export default function TabNavigator() {
>>>>>>> f4deeac2c7e7abc59288c9ee25b771ba821b4109:app/StackNavigator/TabNavigator.jsx
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;
            switch (route.name) {
              case "Home": iconName = "home"; break;
              case "Recipe": iconName = "cutlery"; break;
              case "Map": iconName = "map"; break;
              case "Calendar": iconName = "calendar"; break;
            }
            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Recipe" component={RecipeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
      </Tab.Navigator>
  );
}