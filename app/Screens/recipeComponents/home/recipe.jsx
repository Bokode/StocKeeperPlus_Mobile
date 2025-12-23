import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import SearchBar from '../../home/searchBar/searchBar'; 
import RecipeItem from '../item/recipeItem';
import RecipeFilter from '../filter/recipeFilter';
import TopBar from '../../topBar/topBar';

import { MOCK_RECIPE_ITEMS } from '../../../../src/data/recipeData'; 

import styles from './recipe.style';

const RecipeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);
  
  const [filters, setFilters] = useState({
    isDoableOnly: false,
    nbEaters: null,
    maxTime: null,
  });

  const toggleFilterModal = () => {
    setFilterVisible(!isFilterVisible);
  };

  const resetFilters = () => {
    setFilters({
      isDoableOnly: false,
      nbEaters: null,
      maxTime: null,
    });
  };

  const filteredData = MOCK_RECIPE_ITEMS.filter(item => {
    if (searchQuery && !item.label.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Note: On recalcule isDoable ici comme dans RecipeItem, ou idéalement cette donnée vient du backend
    const isDoable = item.timetomake % 2 !== 0; // Logique temporaire
    if (filters.isDoableOnly && !isDoable) {
      return false;
    }

    if (filters.nbEaters !== null) {
        // Si la recette n'a pas d'info (null), on l'exclut si on cherche un nombre précis
        if (item.nbeaters === null) return false;
        
        // Comparaison numérique
        if (item.nbeaters !== parseInt(filters.nbEaters)) return false; 
    }

    // 4. Filtre Temps Max
    if (filters.maxTime) {
        // Si la recette n'a pas de temps (null), on l'exclut généralement des tris par temps
        if (item.timetomake === null) return false;

        if (item.timetomake > filters.maxTime) return false;
    }

    return true;
  });

  return (
    <>
    <TopBar />
    <View style={styles.containerScreen}>
      <Text style={styles.title}>Vos Recettes</Text>
      
      <SearchBar 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        toggleFilter={toggleFilterModal}
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

      <RecipeFilter
        isFilterVisible={isFilterVisible}
        toggleFilter={toggleFilterModal}
        filters={filters}
        setFilters={setFilters}
        onReset={resetFilters}
      />
    </View>
    </>
  );
};

export default RecipeScreen;