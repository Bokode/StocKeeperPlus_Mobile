import { faAngleLeft, faBoxArchive, faCalendar, faPenToSquare, faTrashCan, faClock, faUtensils, faListUl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useState, useMemo, Suspense } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View, Modal, FlatList, ActivityIndicator } from 'react-native';
import AddOrUpdateFood from '../AddUpdateFood/addOrUpdateFood';
import styles from "./readFood.styles"
import { BASE_URL } from '../../../config/config';
import { useRecipes } from '../../../../src/hooks/useRecipes';
const ReadRecipe = React.lazy(() => import('../../recipeComponents/readRecipe/readRecipe'));

export default function ReadFood({ onClose, data, updateFoodFromDB, addFoodFromDB, onRefresh }) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddOrUpdateFood, setShowAddOrUpdateFood] = useState(false);
  const [showRecipeDetail, setShowRecipeDetail] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const image = { uri: BASE_URL.slice(0, -3) + data.imagepath };
  const { recipes } = useRecipes();
  
  let nutriScoreImage;
  switch (data.nutriscoreFood) {
    case "A":
      nutriScoreImage = require("../../../../assets/nutriscore/nutriscore_a.png");
      break;
    case "B":
      nutriScoreImage = require("../../../../assets/nutriscore/nutriscore_b.png");
      break;
    case "C":
      nutriScoreImage = require("../../../../assets/nutriscore/nutriscore_c.png");
      break;
    case "D":
      nutriScoreImage = require("../../../../assets/nutriscore/nutriscore_d.png");
      break;
    case "E":
      nutriScoreImage = require("../../../../assets/nutriscore/nutriscore_e.png");
      break;
    default:
      nutriScoreImage = require("../../../../assets/nutriscore/nutriscore_unknown.png");
  }

  let measuringunit;
  switch (data.measuringunit) {
    case "unit":
      measuringunit = "Unité";
      break;
    case "gram":
      measuringunit = "Gramme";
      break;
    case "centiliter":
      measuringunit = "Centilitre";
      break;
    default: 
      measuringunit = "Quantité";
  }

  const recipeToShow = useMemo(() => {
    if (!recipes || recipes.length === 0) return [];

    return recipes
      .filter(recipe =>
        recipe.ingredientamount_ingredientamount_recipeTorecipe?.some(
          ing => ing.food === data.idFood
        )
      )
      .map(recipe => ({
        id: recipe.id,
        label: recipe.label,
        timeToMake: recipe.timetomake,
        nbEaters: recipe.nbeaters,
        numberOfIngredients:
          recipe.ingredientamount_ingredientamount_recipeTorecipe?.length || 0,
        fullRecipe: recipe
      }));
  }, [recipes, data.idFood]);

  function deleteFoodFromDB() {
    fetch(`${BASE_URL}/foodUser/me`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({food: data.idFood, user_mail: data.userMail})
    })
    .then(() => {
      onRefresh();
      onClose();
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <>
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.topContainer}>
          <View style={styles.line}>
            <TouchableOpacity onPress={() => onClose()} style={styles.button}>
              <FontAwesomeIcon icon={faAngleLeft} size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowDeleteModal(true)} style={styles.button}>
              <FontAwesomeIcon icon={faTrashCan} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={[styles.line, styles.updateLine]}>
            <TouchableOpacity onPress={() => setShowAddOrUpdateFood(true)} style={styles.button}>
              <FontAwesomeIcon icon={faPenToSquare} size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.containerContent}>
        <Text style={styles.title}>
          {data.labelFood}
        </Text>
        <Text style={styles.miniTitle}>
          {data.quantity} {measuringunit}{data.quantity > 1 ? "s" : ""}
        </Text>
        <View style={styles.rowMiniTitle}>
          <FontAwesomeIcon icon={faBoxArchive} size={14} color="black" style={{marginRight: 6}}/>
          <Text style={styles.miniTitle}>
            Stockage
          </Text>
        </View>
        <Text style={styles.textData}>
          {data.storagetype}
        </Text>
        <View style={styles.rowMiniTitle}>
          <FontAwesomeIcon icon={faCalendar} size={14} color="black" style={{marginRight: 6}}/>
          <Text style={styles.miniTitle}>
            Date d&apos;expiration
          </Text>
        </View>
        <Text style={styles.textData}>
          {data.expirationdate}
        </Text>
        <Image source={nutriScoreImage} style={styles.nutriScoreImage}/>
        {recipeToShow.length > 0 && (
          <>
          <View style={styles.rowMiniTitle}>
            <Text style={styles.miniTitle}>
              Recettes
            </Text>
          </View>
          <View style={styles.carouselContainer}>
            <FlatList
              data={recipeToShow}
              keyExtractor={(item) => item.id.toString()}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }} 
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.carouselCard}
                  activeOpacity={0.8}
                  onPress={() => {
                    setSelectedRecipe(item.fullRecipe);
                    setShowRecipeDetail(true);
                  }}
                >
                  <View style={styles.cardHeader}>
                    <Text style={styles.carouselTitle} numberOfLines={1}>
                      {item.label}
                    </Text>
                  </View>
                  
                  <View style={styles.cardBody}>
                    <View style={styles.statRow}>
                      <View style={styles.iconContainer}>
                        <FontAwesomeIcon icon={faClock} size={14} color="#4379de" />
                      </View>
                      <Text style={styles.carouselText}>{item.timeToMake} {item.timeToMake > 1 ? "Minutes" : "Minute"}</Text>
                    </View>
                     <View style={styles.statRow}>
                      <View style={styles.iconContainer}>
                        <FontAwesomeIcon icon={faUtensils} size={14} color="#4379de" />
                      </View>
                      <Text style={styles.carouselText}>{item.nbEaters} {item.nbEaters > 1 ? "Personnes" : "Personne"}</Text>
                    </View>
                    <View style={styles.statRow}>
                      <View style={styles.iconContainer}>
                        <FontAwesomeIcon icon={faListUl} size={14} color="#4379de" />
                      </View>
                      <Text style={styles.carouselText}>{item.numberOfIngredients} {item.numberOfIngredients > 1 ? "Ingrédients" : "Ingrédient"}</Text>
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
          </>
        )}
      </View>
    </View>
    {showDeleteModal && (
      <Modal
        animationType="slide"        
        presentationStyle="pageSheet" 
        onRequestClose={() => setShowDeleteModal(false)} 
        backdropColor={"transparent"}
      >
        <View style={styles.modalDelete}>
          <Text style={styles.textModal}>Êtes-vous sûr de vouloir supprimer cet aliment ?</Text>
          <TouchableOpacity
            style={styles.buttonModalYes}
            onPress={() => {
              deleteFoodFromDB();
              setShowDeleteModal(false);
            }}
          >
            <Text style={styles.buttonTextYes}>Oui</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonModalNo}
            onPress={() => setShowDeleteModal(false)}
          >
            <Text style={styles.buttonTextNo}>Non</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )}
    {showAddOrUpdateFood && (
      <Modal    
        animationType="slide"        
        presentationStyle="pageSheet" 
        onRequestClose={() => setShowAddOrUpdateFood(false)} 
      >
        <AddOrUpdateFood 
          onClose={() => setShowAddOrUpdateFood(false)} 
          isAnAdd={false} 
          updateFoodFromDB={updateFoodFromDB} 
          addFoodFromDB={addFoodFromDB} 
          data={data} 
          onCloseRead={onClose}/>
      </Modal>
    )}
    {showRecipeDetail && selectedRecipe && (
      <Modal
        animationType="slide"
        presentationStyle="pageSheet"
        onRequestClose={() => setShowRecipeDetail(false)}
      >
        <Suspense fallback={
          <View style={{ 
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            padding: 20
          }}>
            <ActivityIndicator size="large" color="#0000ff" />
            <Text>Chargement...</Text>
          </View>
        }>
          <ReadRecipe
            data={selectedRecipe}
            onClose={() => setShowRecipeDetail(false)}
          />
        </Suspense>
      </Modal>
    )}
    </>
    )
};