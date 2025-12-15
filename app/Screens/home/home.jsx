import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AddFood from './addFood';
import FoodItem from './foodItem';
import ReadFood from './readFood';
import SearchBar from './searchBar';

const HomeScreen = () => {
  const [showAddFood, setShowAddFood] = useState(false);
  const [showReadFood, setShowReadFood] = useState(false);
  const [indexFood, setIndexFood] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Remplacer par les fetchs de l'API
  let mockUsername = "Patron"
  let mockData = [
    { label: "Pomme", diet: "vegan", nutriScore: "A", quantity: 15, storageType: "Corbeille de fruits", expirationDate: "2025-12-12"},
    { label: "Banane", diet: "vegan", nutriScore: "A", quantity: 10, storageType: "Frigo", expirationDate: "2025-12-21" },
    { label: "Steak", diet: "viande", nutriScore: "B", quantity: 3, storageType: "Frigo", expirationDate: "2025-12-17" },
    { label: "Oiseau", diet: "Viande", nutriScore: "C", quantity: 23, storageType: "Armoire", expirationDate: "2025-12-08" },
    { label: "Pomme", diet: "vegan", nutriScore: "A", quantity: 15, storageType: "Corbeille de fruits", expirationDate: "2025-12-10"},
    { label: "Bonone", diet: "vegan", nutriScore: "A", quantity: 10, storageType: "Frigo", expirationDate: "2025-12-12" },
    { label: "Steak", diet: "viande", nutriScore: "B", quantity: 3, storageType: "Frigo", expirationDate: "2025-12-19" },
    { label: "Oiseau", diet: "Viande", nutriScore: "?", quantity: 23, storageType: "Armoire", expirationDate: "2025-12-08" },
  ];

  const filteredData = mockData.filter(item =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return showAddFood ? (
    <AddFood onClose={() => setShowAddFood(false)} />
  ) : ( showReadFood ? (
      <ReadFood onClose={() => setShowReadFood(false)} data={mockData[indexFood]} />
  ) : (
    <View style={styles.containerScreen}>
      <Text style={styles.title}>Bonjour {mockUsername},</Text>
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery}/>
      <ScrollView  style={styles.containerContent} showsVerticalScrollIndicator={false}>
        {filteredData.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => {setIndexFood(index); setShowReadFood(true)}}>
            <FoodItem {...item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setShowAddFood(true)}
      >
        <FontAwesomeIcon icon={faPlus} size={24} color="white" />
      </TouchableOpacity>
    </View>
  )
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
  },
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4379de',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
})

export default HomeScreen;