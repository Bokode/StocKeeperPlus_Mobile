import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchBar from '../home/searchBar'; 
import RecipeItem from './recipeItem';
import RecipeFilter from './recipeFilter'; // Import du nouveau filtre
import { MOCK_RECIPE_ITEMS } from '../../../src/data/recipeData'; 

const RecipeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);
  
  // État des filtres
  const [filters, setFilters] = useState({
    isDoableOnly: false,
    nbEaters: "", // String vide pour l'input
    maxTime: null,
  });

  const toggleFilterModal = () => {
    setFilterVisible(!isFilterVisible);
  };

  const resetFilters = () => {
    setFilters({
      isDoableOnly: false,
      nbEaters: "",
      maxTime: null,
    });
  };

  // Logique de filtrage combinée
  const filteredData = MOCK_RECIPE_ITEMS.filter(item => {
    // 1. Recherche Textuelle
    if (searchQuery && !item.label.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // 2. Filtre "Faisable uniquement"
    // Note: On recalcule isDoable ici comme dans RecipeItem, ou idéalement cette donnée vient du backend
    const isDoable = item.timetomake % 2 !== 0; // Ta logique temporaire
    if (filters.isDoableOnly && !isDoable) {
      return false;
    }

    // 3. Filtre "Nombre de personnes"
    if (filters.nbEaters !== "" && item.nbeaters !== parseInt(filters.nbEaters)) {
      // Tu peux changer !== par < si tu veux "au moins X personnes"
      return false; 
    }

    // 4. Filtre "Temps max"
    if (filters.maxTime && item.timetomake > filters.maxTime) {
      return false;
    }

    return true;
  });

  return (
    <View style={styles.containerScreen}>
      <Text style={styles.title}>Vos Recettes</Text>
      
      <SearchBar 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        toggleFilter={toggleFilterModal} // Ouvre maintenant le modal
      />

      <ScrollView style={styles.containerContent} showsVerticalScrollIndicator={false}>
        {filteredData.length > 0 ? (
          filteredData.map((item) => (
            <TouchableOpacity key={item.id} onPress={() => console.log("Ouvrir recette", item.id)}>
              <RecipeItem {...item} />
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.noResultText}>Aucune recette trouvée</Text>
        )}
        
        <View style={{height: 20}} />
      </ScrollView>

      {/* Intégration du composant Filter */}
      <RecipeFilter
        isFilterVisible={isFilterVisible}
        toggleFilter={toggleFilterModal}
        filters={filters}
        setFilters={setFilters}
        onReset={resetFilters}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    backgroundColor: '#f7f9fd'
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10,
    color: '#1c1b1f'
  },
  containerContent: {
    marginTop: 20
  },
  noResultText: {
    textAlign: 'center',
    color: 'grey',
    marginTop: 20,
    fontSize: 16
  }
});

export default RecipeScreen;