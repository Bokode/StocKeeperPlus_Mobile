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
    nbEaters: null,
    maxTime: null,
    minPercentage: 0
  });

  const toggleFilterModal = () => {
    setFilterVisible(!isFilterVisible);
  };

  const resetFilters = () => {
    setFilters({
      nbEaters: null,
      maxTime: null,
      minPercentage: 0
    });
  };

  const filteredData = MOCK_RECIPE_ITEMS.filter(item => {
    if (searchQuery && !item.label.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // --- CALCUL DU POURCENTAGE (Même formule que RecipeItem) ---
    // Important : On doit recalculer ça ici pour savoir si on garde l'item ou pas
    const percentage = Math.min(100, Math.max(0, (item.id * 17) % 100 + 20));

    // 2. Dropdown "Faisabilité" (minPercentage)
    if (filters.minPercentage > 0 && percentage < filters.minPercentage) {
        return false;
    }

    if (filters.nbEaters !== null) {
        if (item.nbeaters === null) return false;
        if (item.nbeaters !== parseInt(filters.nbEaters)) return false; 
    }

    if (filters.maxTime) {
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