import { useState, useContext } from 'react';
import { ScrollView, Text, TouchableOpacity, View, Modal } from 'react-native';
import SearchBar from '../../home/searchBar/searchBar'; 
import RecipeItem from '../item/recipeItem';
import RecipeFilter from '../filter/recipeFilter';
import TopBar from '../../topBar/topBar';
import ReadRecipe from '../readRecipe/readRecipe';

import { RecipeContext } from '../../../context/recipeContext';
import styles from './recipe.style';

const RecipeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showReadRecipe, setShowReadRecipe] = useState(false);
  
  const [filters, setFilters] = useState({
    nbEaters: null,
    maxTime: null,
    minPercentage: 0,
    onlyFavorites: false
  });

  const { 
      recipes, 
      favorites, 
      toggleFavorite, 
      calculateFeasibility 
  } = useContext(RecipeContext);

  const filteredData = recipes.filter(item => {
    const recipePercentage = calculateFeasibility(item);

    if (searchQuery && !item.label.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (filters.minPercentage > 0 && recipePercentage < filters.minPercentage) return false;
    if (filters.nbEaters && item.nbeaters !== parseInt(filters.nbEaters)) return false;
    if (filters.maxTime && item.timetomake > filters.maxTime) return false;
    if (filters.onlyFavorites && !favorites.includes(item.id)) return false;
    
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
          toggleFilter={() => setFilterVisible(true)}
        />

        <ScrollView style={styles.containerContent} showsVerticalScrollIndicator={false}>
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <TouchableOpacity 
                key={item.id} 
                onPress={() => {
                  setSelectedRecipe(item);
                  setShowReadRecipe(true);
                }}
              >
                <RecipeItem 
                    {...item} 
                    isFavorite={favorites.includes(item.id)}
                    percentage={calculateFeasibility(item)} 
                />
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultText}>Aucune recette trouvée</Text>
          )}
          <View style={{height: 20}} />
        </ScrollView>

        {showReadRecipe && selectedRecipe && (
          <Modal 
            animationType="slide" 
            presentationStyle="pageSheet" 
            onRequestClose={() => setShowReadRecipe(false)}
          >
            <ReadRecipe 
              onClose={() => setShowReadRecipe(false)} 
              data={selectedRecipe} 
              isFavorite={favorites.includes(selectedRecipe.id)}
              onToggleFavorite={() => toggleFavorite(selectedRecipe.id)}
              percentage={calculateFeasibility(selectedRecipe)}
            />
          </Modal>
        )}
        <RecipeFilter
          isFilterVisible={isFilterVisible}
          toggleFilter={() => setFilterVisible(false)}
          filters={filters}
          setFilters={setFilters}
          onReset={() => setFilters({ nbEaters: null, maxTime: null, minPercentage: 0, onlyFavorites: false })}
        />
      </View>
    </>
  );
};

export default RecipeScreen;