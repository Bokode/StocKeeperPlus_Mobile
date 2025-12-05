import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

const API_KEY_SPASH = ""; // ajouter la clé api de chez https://unsplash.com/developers

export default function DetailsStore({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const [images, setImages] = useState({});

  // liste temporaire
  const items = [
    { name: "Pomme", price: 1.2 },
    { name: "Banane", price: 0.8 },
    { name: "Orange", price: 1.5 },
    { name: "Raisin", price: 2.0 },
    { name: "Fraise", price: 2.5 },
    { name: "Ananas", price: 3.0 },
    { name: "Mangue", price: 2.8 },
    { name: "Kiwi", price: 1.7 },
    { name: "Cerise", price: 2.2 },
    { name: "Poire", price: 1.4 },
    { name: "Prune", price: 1.6 },
    { name: "Abricot", price: 2.1 },
    { name: "Melon", price: 3.2 },
    { name: "Pastèque", price: 3.5 },
    { name: "Tarte", price: 0.9 }
  ];

  // On filtre la liste selon le texte saisi
  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchText.toLowerCase())
  );

  // Fonction de récupération image Unsplash
  const fetchImageUnsplash = async (query) => {
    try {
      const response = await fetch(
        `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&per_page=1&client_id=${API_KEY_SPASH}`
      );
      const data = await response.json();

      return (
        data?.results?.[0]?.urls?.small ||
        "https://via.placeholder.com/80"
      );
    } catch {
      return "https://via.placeholder.com/80";
    }
  };

  // Récupération des images à l'ouverture
  useEffect(() => {
    items.forEach(async (item) => {
      const imgUrl = await fetchImageUnsplash(item.name);

      setImages((prev) => ({
        ...prev,
        [item.name]: imgUrl,
      }));
    });
  }, []);

  return (
    <View style={{ flex: 1 }}>
      {/* Bouton retour */}
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.goBackButton}>
        <Ionicons name="arrow-back" size={28} color="black" />
      </TouchableOpacity>

      {/* Titre */}
      <Text style={styles.title}>Title store</Text>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Rechercher..."
          value={searchText}
          onChangeText={setSearchText}
        />
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="search" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="funnel-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Liste des aliments filtrée */}
      <ScrollView style={{ marginTop: 100, paddingHorizontal: 30 }}>
        {filteredItems.map((item, index) => (
          <View key={index} style={styles.foodBox}>
            {/* Image de l’aliment */}
            <Image
              source={{ uri: images[item.name] }}
              style={styles.foodImage}
            />

            {/* Texte à droite */}
            <View style={{ marginLeft: 10 }}>
              <Text style={styles.foodName}>{item.name}</Text>
              <Text style={styles.foodPrice}>{item.price} €</Text>
            </View>
          </View>
        ))}

        {/* Message si aucun résultat */}
        {filteredItems.length === 0 && (
          <Text style={{ textAlign: "center", marginTop: 20, fontSize: 16 }}>
            Aucun résultat
          </Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  goBackButton: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
  },
  title: {
    marginTop: 100,
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  searchContainer: {
    position: "absolute",
    top: 150,
    left: 30,
    right: 30,
    flexDirection: "row",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
    zIndex: 10,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    alignItems: "center",
  },
  input: { flex: 1, height: 40 },
  iconButton: {
    marginLeft: 8,
    padding: 8,
    borderRadius: 7,
  },
  foodBox: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    padding: 15,
    backgroundColor: "white",
    borderRadius: 15,
    elevation: 3,
  },
  foodImage: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: "#eee",
  },
  foodName: {
    fontSize: 18,
    fontWeight: "600",
  },
  foodPrice: {
    fontSize: 16,
    marginTop: 5,
  },
});