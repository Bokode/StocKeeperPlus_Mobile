import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// IMPORTS DU DOSSIER VOISIN (HOME)
import SearchBar from '../home/searchBar';
// Si tu veux réutiliser le filtre plus tard : import Filter from '../home/filter';

// IMPORTS LOCAUX
import { MOCK_RECIPE_ITEMS } from '../../../src/data/recipeData';
import RecipeItem from './recipeItem';

const RecipeScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Pour l'instant, je ne mets pas encore la logique complexe de filtre (modal)
  // On garde juste la fonction toggle pour que le bouton de la SearchBar ne plante pas
  const toggleFilterModal = () => {
    console.log("Ouvrir filtres recettes"); 
  };

  // Filtrage simple sur le nom de la recette
  const filteredData = MOCK_RECIPE_ITEMS.filter(item => {
    if (searchQuery && !item.label.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <View style={styles.containerScreen}>
      {/* Titre spécifique à la page Recette */}
      <Text style={styles.title}>Vos Recettes</Text>
      
      {/* Réutilisation de la SearchBar de ton camarade */}
      <SearchBar 
        searchQuery={searchQuery} 
        onSearchChange={setSearchQuery} 
        toggleFilter={toggleFilterModal}
      />

      <ScrollView style={styles.containerContent} showsVerticalScrollIndicator={false}>
        {filteredData.map((item) => (
          // On passe l'objet item entier ou déstructuré
          <TouchableOpacity key={item.id} onPress={() => console.log("Ouvrir recette", item.id)}>
            <RecipeItem {...item} />
          </TouchableOpacity>
        ))}
        
        {/* Espace vide en bas pour que le dernier item ne soit pas collé au bord */}
        <View style={{height: 20}} />
      </ScrollView>

      {/* Si tu as besoin d'un bouton + pour créer une recette, tu peux reprendre le FAB de home.jsx */}
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