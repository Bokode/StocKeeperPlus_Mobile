import CalendarScreen from "../Screens/calendar/calendar";
import HomeScreen from "../Screens/home/homeScreen/home";
import MapScreen from "../Screens/Map/map";
import DetailsStore from "../Screens/Map/detailsStore";
import RecipeScreen from "../Screens/recipeComponents/home/recipe";

import { View } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";
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

export default function TabNavigator() {
  return (
      <Tab.Navigator
        initialRouteName="Accueil"
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
              case "Accueil":
                iconName = "home";
                break;
              case "Recette":
                iconName = "cutlery";
                break;
              case "Carte":
                iconName = "map";
                break;
              case "Calendrier":
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
        <Tab.Screen name="Accueil" component={HomeScreen} />
        <Tab.Screen name="Recette" component={RecipeScreen} />
        <Tab.Screen name="Carte" component={MapStack} />
        <Tab.Screen name="Calendrier" component={CalendarScreen} />
      </Tab.Navigator>
  );
}