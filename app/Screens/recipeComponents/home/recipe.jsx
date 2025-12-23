import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, Text, TouchableOpacity, View, Modal } from 'react-native'; // Ajout de Modal
import SearchBar from '../../home/searchBar/searchBar'; 
import RecipeItem from '../item/recipeItem';
import RecipeFilter from '../filter/recipeFilter';
import TopBar from '../../topBar/topBar';
import ReadRecipe from '../readRecipe/readRecipe'; // Import de ton composant de détail

import { MOCK_RECIPE_ITEMS } from '../../../../src/data/recipeData'; 
import styles from './recipe.style';

const RecipeScreen = () => {
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);
  
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showReadRecipe, setShowReadRecipe] = useState(false); // État pour le Modal

  const [filters, setFilters] = useState({
    nbEaters: null,
    maxTime: null,
    minPercentage: 0,
    onlyFavorites: false
  });

  const toggleFilterModal = () => {
    setFilterVisible(!isFilterVisible);
  };

  const resetFilters = () => {
    setFilters({
      nbEaters: null,
      maxTime: null,
      minPercentage: 0,
      onlyFavorites: false
    });
  };

  // Charger les favoris au démarrage
  useEffect(() => {
    const loadFavorites = async () => {
      try {
        const savedFavorites = await AsyncStorage.getItem('recipe_favorites');
        if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
      } catch (e) { console.error("Erreur chargement favoris", e); }
    };
    loadFavorites();
  }, []);

  // Fonction pour ajouter/retirer un favori
  const toggleFavorite = async (recipeId) => {
    let newFavorites = [...favorites];
    if (newFavorites.includes(recipeId)) {
      newFavorites = newFavorites.filter(id => id !== recipeId);
    } else {
      newFavorites.push(recipeId);
    }
    setFavorites(newFavorites);
    await AsyncStorage.setItem('recipe_favorites', JSON.stringify(newFavorites));
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

    // Nouveau filtre Favoris
    if (filters.onlyFavorites && !favorites.includes(item.id)) {
      return false;
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
                <RecipeItem {...item} isFavorite={favorites.includes(item.id)}/>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noResultText}>Aucune recette trouvée</Text>
          )}
          
          <View style={{height: 20}} />
        </ScrollView>

        {/* MODAL POUR LE DÉTAIL (Comme dans HomeScreen) */}
        {showReadRecipe && (
        <Modal animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setShowReadRecipe(false)}>
          <ReadRecipe 
            onClose={() => setShowReadRecipe(false)} 
            data={selectedRecipe} 
            isFavorite={favorites.includes(selectedRecipe.id)} // On passe l'état
            onToggleFavorite={() => toggleFavorite(selectedRecipe.id)} // On passe la fonction
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