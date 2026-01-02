import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Modal
} from "react-native";
import TopBar from "../topBar/topBar";
import { BASE_URL } from "../../config/config";

const EXPO_PUBLIC_API_KEY_SPLASH = process.env.EXPO_PUBLIC_API_KEY_SPLASH;

export default function DetailsStore({ route, navigation }) {
  const { storeId, storeName } = route.params;

  const [searchText, setSearchText] = useState("");
  const [images, setImages] = useState({});
  const [filterVisible, setFilterVisible] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  
  const [foodItems, setFoodItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAndEnrichFood = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}/foodstore/all/`);
        const allData = await response.json();

        const storeProducts = allData.filter(item => String(item.store) === String(storeId));

        const enrichedItems = await Promise.all(
          storeProducts.map(async (item) => {
            try {
              const foodResponse = await fetch(`${BASE_URL}/food/get/${item.food}/`);
              const foodInfo = await foodResponse.json();
              return { 
                ...item, 
                name: foodInfo.label || "Aliment Inconnu",
                price: parseFloat(item.price)
              };
            } catch (err) {
              return { ...item, name: "Non répertorié", price: parseFloat(item.price) };
            }
          })
        );

        setFoodItems(enrichedItems);
        fetchImagesForItems(enrichedItems);
      } catch (error) {
        console.error("Erreur fetch details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAndEnrichFood();
  }, [storeId]);

  const fetchImagesForItems = async (items) => {
    const newImages = { ...images };
    for (const item of items) {
      if (item.name && !newImages[item.name]) {
        const imgUrl = await fetchImageUnsplash(item.name);
        newImages[item.name] = imgUrl;
      }
    }
    setImages(newImages);
  };

  const fetchImageUnsplash = async (query) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${EXPO_PUBLIC_API_KEY_SPLASH}`
      );
      const data = await response.json();
      return data?.results?.[0]?.urls?.small || "https://via.placeholder.com/80";
    } catch {
      return "https://via.placeholder.com/80";
    }
  };

  const filteredItems = foodItems.filter(item => {
    const matchesText = item.name.toLowerCase().includes(searchText.toLowerCase());
    const min = parseFloat(minPrice);
    const max = parseFloat(maxPrice);
    const matchesMin = isNaN(min) ? true : item.price >= min;
    const matchesMax = isNaN(max) ? true : item.price <= max;
    return matchesText && matchesMin && matchesMax;
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={{marginTop: 10}}>Mise à jour des stocks...</Text>
      </View>
    );
  }

  return (
    <>
      <TopBar />
      <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>

        <Text style={styles.title}>{storeName || "Détails Magasin"}</Text>

        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            placeholder="Rechercher un aliment..."
            value={searchText}
            onChangeText={setSearchText}
          />
          <TouchableOpacity onPress={() => setFilterVisible(true)} style={styles.iconButton}>
            <Ionicons name="options-outline" size={24} color={(minPrice || maxPrice) ? "#007AFF" : "black"} />
          </TouchableOpacity>
        </View>

        <Modal visible={filterVisible} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Filtrer par prix</Text>
              <View style={styles.rangeContainer}>
                <TextInput style={styles.inlineInput} placeholder="Min" value={minPrice} onChangeText={setMinPrice} keyboardType="numeric" />
                <Text> à </Text>
                <TextInput style={styles.inlineInput} placeholder="Max" value={maxPrice} onChangeText={setMaxPrice} keyboardType="numeric" />
                <Text> €</Text>
              </View>
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => { setMinPrice(""); setMaxPrice(""); }}>
                  <Text style={styles.clearButton}>Effacer</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.validateButton} onPress={() => setFilterVisible(false)}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>Appliquer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>

        <ScrollView style={{ marginTop: 120, paddingHorizontal: 20 }}>
          {filteredItems.map((item, index) => (
            <View key={index} style={styles.foodBox}>
              <Image 
                source={{ uri: images[item.name] || "https://via.placeholder.com/80" }} 
                style={styles.foodImage} 
              />
              <View style={{ marginLeft: 15, flex: 1 }}>
                <Text style={styles.foodName}>{item.name}</Text>
                <Text style={styles.foodPrice}>{item.price.toFixed(2)} €</Text>
                <Text style={styles.foodQty}>Quantité en stock : {item.quantity}</Text>
              </View>
            </View>
          ))}
          {filteredItems.length === 0 && (
            <Text style={styles.noResult}>Aucun produit trouvé.</Text>
          )}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#FFFFFF" },
  center: {
    flex: 1, 
    justifyContent: "center", 
    alignItems: "center" },
  goBackButton: { 
    position: "absolute", 
    top: 60, 
    left: 20, 
    zIndex: 10 },
  title: { 
    marginTop: 100, 
    fontSize: 22, 
    fontWeight: "bold", 
    textAlign: "center", 
    color: "#1A1A1A" },
  searchContainer: { 
    position: "absolute", 
    top: 150, 
    left: 20, 
    right: 20, 
    flexDirection: "row", 
    backgroundColor: "white", 
    borderRadius: 15, 
    paddingHorizontal: 15, 
    paddingVertical: 5, 
    zIndex: 10, 
    elevation: 3, 
    shadowColor: "#000", 
    shadowOpacity: 0.1, 
    shadowRadius: 5, 
    alignItems: "center" },
  input: { 
    flex: 1, 
    height: 45 },
  iconButton: { 
    marginLeft: 10 },
  foodBox: { 
    flexDirection: "row", 
    alignItems: "center", 
    marginBottom: 12, 
    padding: 12, 
    backgroundColor: "white", 
    borderRadius: 18, 
    elevation: 2, 
    shadowColor: "#000", 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    shadowOffset: { 
      width: 0,
       height: 2 } },
  foodImage: { 
    width: 75, 
    height: 75, 
    borderRadius: 15, 
    backgroundColor: "#EEE" },
  foodName: { 
    fontSize: 18, 
    fontWeight: "600", 
    color: "#333" },
  foodPrice: { 
    fontSize: 16, 
    color: "#27ae60", 
    fontWeight: "700", 
    marginTop: 4 },
  foodQty: { 
    fontSize: 13, 
    color: "#7f8c8d", 
    marginTop: 2 },
  noResult: { 
    textAlign: "center",
    marginTop: 50, 
    color: "#95a5a6" },
  modalOverlay: { 
    flex: 1, 
    backgroundColor: "rgba(0,0,0,0.5)", 
    justifyContent: "center", 
    alignItems: "center" },
  modalContent: { 
    width: "80%", 
    backgroundColor: "white", 
    padding: 25, 
    borderRadius: 20 },
  modalTitle: { 
    fontWeight: "bold", 
    marginBottom: 20, 
    textAlign: "center", 
    fontSize: 18 },
  rangeContainer: { 
    flexDirection: "row", 
    justifyContent: "center", 
    alignItems: "center", 
    marginBottom: 30 },
  inlineInput: { 
    borderWidth: 1, 
    borderColor: "#DDD", 
    borderRadius: 10, 
    padding: 8, 
    width: 70, 
    textAlign: "center" },
  modalButtons: { 
    flexDirection: "row", 
    justifyContent: "space-between", 
    alignItems: "center" },
  validateButton: { 
    backgroundColor: "#007AFF", 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    borderRadius: 10 },
  clearButton: { color: "#e74c3c" }
});