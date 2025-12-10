import CalendarScreen from "./Screens/calendar";
import HomeScreen from "./Screens/home/home";
import MapScreen from "./Screens/map";
import RecipeScreen from "./Screens/recipe";

import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function Index() {
  return (
      <Tab.Navigator
        initialRouteName="HomeScreen"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarIcon: ({ color, size }) => {
            let iconName;

            switch (route.name) {
              case "HomeScreen":
                iconName = "home";
                break;
              case "RecipeScreen":
                iconName = "cutlery";
                break;
              case "MapScreen":
                iconName = "map";
                break;
              case "CalendarScreen":
                iconName = "calendar";
                break;
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: "#007AFF",
          tabBarInactiveTintColor: "gray",
        })}
      >
        <Tab.Screen name="HomeScreen" component={HomeScreen} />
        <Tab.Screen name="RecipeScreen" component={RecipeScreen} />
        <Tab.Screen name="MapScreen" component={MapScreen} />
        <Tab.Screen name="CalendarScreen" component={CalendarScreen} />
      </Tab.Navigator>
  );
}