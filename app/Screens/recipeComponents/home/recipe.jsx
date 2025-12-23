import { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Modal } from 'react-native'; // Ajout de Modal
import SearchBar from '../../home/searchBar/searchBar'; 
import RecipeItem from '../item/recipeItem';
import RecipeFilter from '../filter/recipeFilter';
import TopBar from '../../topBar/topBar';
import ReadRecipe from '../readRecipe/readRecipe'; // Import de ton composant de détail

import { MOCK_RECIPE_ITEMS } from '../../../../src/data/recipeData'; 
import styles from './recipe.style';

const RecipeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);
  
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showReadRecipe, setShowReadRecipe] = useState(false); // État pour le Modal

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

    const percentage = Math.min(100, Math.max(0, (item.id * 17) % 100 + 20));

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
              <TouchableOpacity 
                key={item.id} 
                onPress={() => {
                  setSelectedRecipe(item);    // On stocke la recette
                  setShowReadRecipe(true);    // On ouvre le Modal
                }}
              >
                <RecipeItem {...item} />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultText}>Aucune recette trouvée</Text>
          )}
          
          <View style={{height: 20}} />
        </ScrollView>

        {/* MODAL POUR LE DÉTAIL (Comme dans HomeScreen) */}
        {showReadRecipe && (
          <Modal      
            animationType="slide"         
            presentationStyle="pageSheet" 
            onRequestClose={() => setShowReadRecipe(false)} 
          >
            <ReadRecipe 
              onClose={() => setShowReadRecipe(false)} 
              data={selectedRecipe} 
            />
          </Modal>
        )}

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