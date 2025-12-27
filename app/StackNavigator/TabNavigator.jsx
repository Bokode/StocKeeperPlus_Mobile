import CalendarScreen from "../Screens/calendar/calendar";
import HomeScreen from "../Screens/home/homeScreen/home";
import MapScreen from "../Screens/map";
import RecipeScreen from "../Screens/recipeComponents/home/recipe";

import { View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,

          tabBarStyle: {
            backgroundColor: "#2c7be5"
          },

          tabBarActiveTintColor: "#eaf4ff",
          tabBarInactiveTintColor: "#e5eefc",

          tabBarIcon: ({ color, size, focused }) => {
            let iconName;

            switch (route.name) {
              case "Home":
                iconName = "home";
                break;
              case "Recipe":q
                iconName = "cutlery";
                break;
              case "Map":
                iconName = "map";
                break;
              case "Calendar":
                iconName = "calendar";
                break;
            }

            return (
              <View
                style={{
                  backgroundColor: focused ? "#58a6ff" : "transparent",
                  borderRadius: 15,
                  paddingInline: 6,
                  width: 50,
                  height: 32,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <FontAwesome name={iconName} size={size} color={color} />
              </View>
            )
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Recipe" component={RecipeScreen} />
        <Tab.Screen name="Map" component={MapScreen} />
        <Tab.Screen name="Calendar" component={CalendarScreen} />
      </Tab.Navigator>
  );
}