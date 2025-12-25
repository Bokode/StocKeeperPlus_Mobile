import { useState, useEffect, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView, Text, TouchableOpacity, View, Modal } from 'react-native';
import SearchBar from '../../home/searchBar/searchBar'; 
import RecipeItem from '../item/recipeItem';
import RecipeFilter from '../filter/recipeFilter';
import TopBar from '../../topBar/topBar';
import ReadRecipe from '../readRecipe/readRecipe';

import { BASE_URL } from '../../../config/config';
import { FoodContext } from '../../../context/foodContext';
import styles from './recipe.style';

const RecipeScreen = () => {
  // --- ÉTATS ---
  const [recipes, setRecipes] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [showReadRecipe, setShowReadRecipe] = useState(false);
  
  const { foodToShow } = useContext(FoodContext); // Récupération du stock réel

  const [filters, setFilters] = useState({
    nbEaters: null,
    maxTime: null,
    minPercentage: 0,
    onlyFavorites: false
  });

  // --- LOGIQUE DE CHARGEMENT ---
  useEffect(() => {
    getAllRecipes();
    loadFavorites();
  }, []);

  const getAllRecipes = async () => {
    try {
      // Suite à la modification du backend (recipeORM.js), cette route inclut désormais les ingrédients
      const response = await fetch(`${BASE_URL}/recipe/all`);
      const data = await response.json();
      setRecipes(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des recettes:", error);
    }
  };

  const loadFavorites = async () => {
    try {
      const savedFavorites = await AsyncStorage.getItem('recipe_favorites');
      if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    } catch (e) {
      console.error("Erreur chargement favoris:", e);
    }
  };

  // --- CALCULS & FILTRAGE ---
  const calculateFeasibility = useCallback((recipe) => {
    const ingredientsReq = recipe.ingredientamount_ingredientamount_recipeTorecipe || [];
    if (ingredientsReq.length === 0) return 0;

    let ownedCount = 0;

    ingredientsReq.forEach(req => {
        // 1. On récupère TOUS les items de l'utilisateur qui correspondent à cet aliment
        // Note: On utilise idFood car c'est ainsi que ton Home.jsx construit les objets
        const userStock = foodToShow.filter(fs => fs.idFood === req.food);

        // 2. On calcule la somme totale des quantités possédées pour cet aliment
        const totalQuantityOwned = userStock.reduce((sum, item) => sum + (item.quantity || 0), 0);

        // 3. On valide l'ingrédient seulement si la quantité possédée >= quantité requise
        if (totalQuantityOwned >= req.quantity) {
            ownedCount++;
        }
    });

    return Math.round((ownedCount / ingredientsReq.length) * 100);
}, [foodToShow]);

  const toggleFavorite = async (recipeId) => {
    let newFavorites = favorites.includes(recipeId)
      ? favorites.filter(id => id !== recipeId)
      : [...favorites, recipeId];
    
    setFavorites(newFavorites);
    await AsyncStorage.setItem('recipe_favorites', JSON.stringify(newFavorites));
  };

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

        {/* MODAL DE DÉTAIL */}
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

        {/* MODAL DE FILTRES */}
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