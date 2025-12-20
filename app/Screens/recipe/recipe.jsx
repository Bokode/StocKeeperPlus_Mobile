import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SearchBar from '../home/searchBar';

import { MOCK_RECIPE_ITEMS } from '../../../src/data/recipeData';
import RecipeItem from './recipeItem';

const RecipeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pas fonctionnel, pour pas que la searchBar plante
  const toggleFilterModal = () => {
    console.log("Ouvrir filtres recettes"); 
  };

  const filteredData = MOCK_RECIPE_ITEMS.filter(item => {
    if (searchQuery && !item.label.toLowerCase().includes(searchQuery.toLowerCase())) {
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
        toggleFilter={toggleFilterModal}
      />

      <ScrollView style={styles.containerContent} showsVerticalScrollIndicator={false}>
        {filteredData.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => console.log("Ouvrir recette", item.id)}>
            <RecipeItem {...item} />
          </TouchableOpacity>
        ))}
        <View style={{height: 20}} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    paddingTop: 40, // Espace pour la barre de statut (à adapter quand vous aurez le header global)
    paddingHorizontal: 20,
    backgroundColor: '#f7f9fd' // Même couleur de fond que Food
  },
  title: {
    fontSize: 28, // Taille comme sur ta maquette recette
    fontWeight: "bold",
    textAlign: "center", // Centré comme sur la maquette recette
    marginBottom: 20,
    marginTop: 10,
    color: '#1c1b1f'
  },
  containerContent: {
    marginTop: 20
  },
});

export default RecipeScreen;