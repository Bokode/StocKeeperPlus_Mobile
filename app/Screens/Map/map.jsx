import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import TopBar from '../topBar/topBar';
import { BASE_URL } from "../../config/config";

export default function MapScreen({ navigation }) {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [radius, setRadius] = useState("100");
  const [filterVisible, setFilterVisible] = useState(false);
  
  const [stores, setStores] = useState([]);
  const [isFetching, setIsFetching] = useState(false);

  // --- LOGIQUE DE CALCUL DE DISTANCE ---
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
  };

  const fetchStores = async (currentCoords) => {
    const coords = currentCoords || location;
    if (!coords) return;

    setIsFetching(true);
    try {
      const response = await fetch(`${BASE_URL}/store/all/`, {
        method: "GET",
        headers: { "Accept": "application/json" }
      });
      const allStores = await response.json();

      const maxRadius = parseFloat(radius) || 100;

      const nearbyStores = allStores.filter(store => {
        const distance = calculateDistance(
          coords.latitude, 
          coords.longitude, 
          parseFloat(store.latitude), 
          parseFloat(store.longitude)
        );
        return distance <= maxRadius;
      });

      setStores(nearbyStores);
    } catch (error) {
      console.error("Erreur fetch stores:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const handleSearch = async () => {
    if (!searchText.trim()) {
      fetchStores(location);
      return;
    }

    setIsFetching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(searchText)}&format=json&limit=1`,
        { headers: { 'User-Agent': 'StocKeeperPlus' } }
      );
      const data = await response.json();

      if (data && data.length > 0) {
        const newCoords = {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
        setLocation(newCoords); 
        fetchStores(newCoords);
      } else {
        alert("Lieu non trouvé");
      }
    } catch (error) {
      console.error("Erreur recherche:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    let subscriber;

    const setupLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        
        if (status !== "granted") {
          console.warn("Permission GPS refusée");
          useFallbackLocation();
          return;
        }

        let initialPos = await Location.getLastKnownPositionAsync({});
        if (!initialPos) {
          initialPos = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });
        }

        const coords = initialPos.coords;
        setLocation(coords);
        fetchStores(coords);

        subscriber = await Location.watchPositionAsync(
          { accuracy: Location.Accuracy.Balanced, distanceInterval: 50 },
          (pos) => setLocation(pos.coords)
        );

      } catch (error) {
        console.error("Erreur de localisation :", error.message);
        useFallbackLocation();
      } finally {
        setLoading(false);
      }
    };

    const useFallbackLocation = () => {
      const defaultCoords = { latitude: 50.8503, longitude: 4.3517 };
      setLocation(defaultCoords);
      fetchStores(defaultCoords);
      setLoading(false);
    };

    setupLocation();

    return () => {
      if (subscriber) subscriber.remove();
    };
  }, []);

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="blue" />
        <Text style={{ marginTop: 10 }}>Chargement de la carte...</Text>
      </View>
    );
  }

  return (
    <>
      <TopBar />
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Rechercher une ville..."
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity style={styles.iconButton} onPress={handleSearch}>
            <Ionicons name="search" size={24} color="black" />
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.iconButton} 
            onPress={() => setFilterVisible(true)}
          >
            <Ionicons name="funnel-outline" size={24} color={radius !== "100" ? "blue" : "black"} />
          </TouchableOpacity>
        </View>

        <MapView
          style={{ flex: 1 }}
          showsUserLocation={true}
          region={
            location
              ? {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.07,
                  longitudeDelta: 0.07
                }
              : undefined
          }
        >
          {stores.map((store, index) => (
            <Marker
              key={store.id || index}
              coordinate={{ 
                latitude: parseFloat(store.latitude), 
                longitude: parseFloat(store.longitude) 
              }}
              title={store.label || store.name}
              onPress={() => navigation.navigate("DetailsStore", { 
                storeId: store.id,
                storeName: store.label || store.name || "Magasin"
              })}
            >
              <Ionicons name="location" size={35} color="#E31A1A" />
            </Marker>
          ))}
        </MapView>

        {isFetching && (
          <View style={styles.loaderFloating}>
            <ActivityIndicator size="small" color="white" />
          </View>
        )}

        {/* Modal Filtre Rayon */}
        <Modal visible={filterVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Rayon de recherche</Text>
              <View style={styles.filterRow}>
                <TextInput 
                  style={styles.radiusInput} 
                  value={radius} 
                  onChangeText={setRadius} 
                  keyboardType="numeric" 
                />
                <Text style={{fontSize: 16}}> km</Text>
              </View>

              <View style={styles.modalActionButtons}>
                <TouchableOpacity onPress={() => { setFilterVisible(false); fetchStores(); }}>
                  <Text style={styles.validateButton}>Valider</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setFilterVisible(false)}>
                  <Text style={styles.closeButton}>Annuler</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    marginTop: -30, 
    borderTopLeftRadius: 30, 
    borderTopRightRadius: 30, 
    overflow: 'hidden' },
  center: { 
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center", 
    backgroundColor: 'white' },
  searchContainer: { 
    position: "absolute", 
    top: 60, 
    left: 20, 
    right: 20, 
    flexDirection: "row", 
    backgroundColor: "white", 
    borderRadius: 12, 
    paddingHorizontal: 10, 
    paddingVertical: 5, 
    zIndex: 10, 
    elevation: 5, 
    shadowColor: "#000", 
    shadowOpacity: 0.3, 
    shadowRadius: 4, 
    alignItems: "center" },
  input: { 
    flex: 1, 
    height: 40 },
  iconButton: { 
    marginLeft: 8, 
    padding: 8 },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.5)", 
    justifyContent: "center", 
    alignItems: "center" },
  modalContent: { 
    width: 280, 
    backgroundColor: "white", 
    padding: 25, 
    borderRadius: 20 },
  modalTitle: { 
    fontWeight: "bold", 
    marginBottom: 20, 
    textAlign: "center", 
    fontSize: 18 },
  filterRow: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 25, 
    justifyContent: "center" },
  radiusInput: { 
    borderWidth: 1, 
    borderColor: "#ddd", 
    borderRadius: 8, 
    padding: 8, 
    width: 70, 
    textAlign: 'center', 
    fontSize: 18 },
  modalActionButtons: { 
    flexDirection: "row", 
    justifyContent: "space-around" },
  validateButton: { 
    backgroundColor: "#007AFF", 
    color: "white", 
    borderRadius: 8, 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    textAlign: "center", 
    fontWeight: 'bold', 
    overflow: 'hidden' },
  closeButton: { 
    color: "#555", 
    padding: 10 },
  loaderFloating: { 
    position: 'absolute', 
    bottom: 40, 
    alignSelf: 'center', 
    backgroundColor: 'rgba(0,0,0,0.7)', 
    padding: 12, 
    borderRadius: 25 }
});