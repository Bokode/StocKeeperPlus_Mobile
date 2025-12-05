import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [radius, setRadius] = useState("100");
  const [filterVisible, setFilterVisible] = useState(false);

  // Géolocalisation
  useEffect(() => {
    let subscriber;
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        subscriber = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.High, distanceInterval: 5 },
          (pos) => setLocation(pos.coords)
        );
      }
      setLoading(false);
    })();

    return () => {
      if (subscriber) subscriber.remove();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <Image
          source={require("../../../assets/images/favicon.png")}
          style={{ width: 120, height: 120, marginBottom: 20 }}
        />
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Rechercher..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.iconButton} onPress={() => console.log("Recherche :", searchText)}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton} onPress={() => setFilterVisible(true)}>
          <Ionicons name="funnel-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Carte */}
      <MapView
        style={{ flex: 1 }}
        showsUserLocation={true}
        followsUserLocation={true}
        region={
          location
            ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
              }
            : undefined
        }
      >
        <Marker
          coordinate={{ latitude: 50.469695, longitude: 4.861748 }}
          onPress={() => navigation.navigate("DetailsStore")}
        />
      </MapView>

      {/* Modal filtre */}
      <Modal
        visible={filterVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setFilterVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={{ fontWeight: "bold", marginBottom: 10, textAlign: "center"}}>Rayon de recherche</Text>
            {/* Ajouter les filtres */}
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 20, justifyContent: "center" }}>
              <TextInput style={{ borderWidth: 1, borderColor: "#ccc", borderRadius: 5, padding: 5, width: 60, marginRight: 10 }} placeholder="100" value={radius} onChangeText={setRadius} keyboardType="numeric" />
              <Text>km</Text>
            </View>
            <View style={{flexDirection: "row", alignItems: "center", justifyContent: "space-around"}}>
              <TouchableOpacity onPress={() => setFilterVisible(false)}>
                <Text style={styles.validateButton}>valider</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setFilterVisible(false)}>
                <Text style={styles.closeButton}>Fermer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  searchContainer: {
    position: "absolute",
    top: 60,
    left: 10,
    right: 10,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 10,
    elevation: 5, // Android shadow
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: "center"
  },
  input: { flex: 1, height: 40 },
  iconButton: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 7
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  modalContent: {
    width: 250,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10
  },
  validateButton: { 
    backgroundColor: "blue",
    textAlign: "center",
    color: "white",
    borderRadius: 5,
    padding: 5
  },
  closeButton: {
    color: "blue",
    textAlign: "center",
    padding: 5
  }

});
