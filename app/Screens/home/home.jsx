import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import FoodItem from './FoodItem';
import SearchBar from './searchBar';

const HomeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Remplacer par les fetchs de l'API
  let mockUsername = "Patron"
  let mockData = [
    { label: "Pomme", diet: "vegan", nutriScore: "A", quantity: 15, storageType: "Corbeille de fruits", expirationDate: "2025-12-10"},
    { label: "Banane", diet: "vegan", nutriScore: "A", quantity: 10, storageType: "Frigo", expirationDate: "2025-12-11" },
    { label: "Steak", diet: "viande", nutriScore: "B", quantity: 3, storageType: "Frigo", expirationDate: "2025-12-15" },
    { label: "Oiseau", diet: "Viande", nutriScore: "C", quantity: 23, storageType: "Armoire", expirationDate: "2025-12-08" },
    { label: "Pomme", diet: "vegan", nutriScore: "A", quantity: 15, storageType: "Corbeille de fruits", expirationDate: "2025-12-10"},
    { label: "Bonone", diet: "vegan", nutriScore: "A", quantity: 10, storageType: "Frigo", expirationDate: "2025-12-11" },
    { label: "Steak", diet: "viande", nutriScore: "B", quantity: 3, storageType: "Frigo", expirationDate: "2025-12-15" },
    { label: "Oiseau", diet: "Viande", nutriScore: "C", quantity: 23, storageType: "Armoire", expirationDate: "2025-12-08" },
  ];

  const filteredData = mockData.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.containerScreen}>
      <Text style={styles.title}>Bonjour {mockUsername},</Text>
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery}/>
      <ScrollView  style={styles.containerContent} showsVerticalScrollIndicator={false}>
        {filteredData.map((item, index) => (
          <FoodItem
            key={index}
            {...item}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    paddingTop: 40,
    paddingInline: 20,
    backgroundColor: '#f7f9fd'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  containerContent: {
    marginTop: 15
  }
})

export default HomeScreen;