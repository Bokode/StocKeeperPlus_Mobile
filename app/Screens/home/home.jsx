import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MOCK_FOOD_ITEMS } from '../../../src/data/foodData';
import AddOrUpdateFood from './addOrUpdateFood';
import Filter from './filter';
import FoodItem from './foodItem';
import ReadFood from './readFood';
import SearchBar from './searchBar';

const HomeScreen = () => {
  const [showAddOrUpdateFood, setShowAddOrUpdateFood] = useState(false);
  const [showReadFood, setShowReadFood] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    estPerime: false,
    storageType: null,
    nutriScore: null,
  });

  function resetFilters() {
    setFilters({
      estPerime: false,
      storageType: null,
      nutriScore: null,
    });
  };

  // Remplacer par les fetchs de l'API
  let mockUsername = "Patron"

  const filteredData = MOCK_FOOD_ITEMS.filter(item => {
  if (searchQuery && !item.label.toLowerCase().includes(searchQuery.toLowerCase())) {
    return false;
  }

  // A Changer
  const today = new Date();
  const expDate = new Date(item.expirationDate);
  const dayBeforeExpiration = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));

  if (filters.estPerime && (dayBeforeExpiration >= 0)) {
    return false;
  }

  if (filters.storageType && item.storageType !== filters.storageType) {
    return false;
  }

  if (filters.nutriScore && item.nutriScore !== filters.nutriScore) {
    return false;
  }

  return true;
});


  const toggleModal = () => {
    setFilterVisible(!isFilterVisible);
  };

  return showAddOrUpdateFood ? (
    <AddOrUpdateFood onClose={() => setShowAddOrUpdateFood(false)} />
  ) : ( showReadFood ? (
    <ReadFood onClose={() => setShowReadFood(false)} data={selectedFood} />
  ) : (
    <View style={styles.containerScreen}>
      <Text style={styles.title}>Bonjour {mockUsername},</Text>
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} toggleFilter={toggleModal}/>
      <ScrollView  style={styles.containerContent} showsVerticalScrollIndicator={false}>
        {filteredData.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => {setSelectedFood(item); setShowReadFood(true)}}>
            <FoodItem {...item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setShowAddOrUpdateFood(true)}
      >
        <FontAwesomeIcon icon={faPlus} size={24} color="white" />
      </TouchableOpacity>
      <Filter
        isFilterVisible={isFilterVisible}
        toggleFilter={toggleModal}
        filters={filters}
        setFilters={setFilters}
        onReset={resetFilters}
      />
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