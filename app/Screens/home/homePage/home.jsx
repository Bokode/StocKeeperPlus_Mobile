import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState, useEffect } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import AddOrUpdateFood from '../AddUpdateFood/addOrUpdateFood';
import Filter from '../filter/filter';
import FoodItem from '../foodItem/foodItem';
import ReadFood from '../readFood/readFood';
import SearchBar from '../searchBar/searchBar';
import styles from "./home.styles"

export default function HomeScreen() {
  const [foodToshow, setAllFoodToShow] = useState([]);
  const [showAddOrUpdateFood, setShowAddOrUpdateFood] = useState(false);
  const [showReadFood, setShowReadFood] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterVisible, setFilterVisible] = useState(false);
  const [filters, setFilters] = useState({
    estPerime: false,
    storageType: null,
    nutriScore: null,
  });
  // A changer selon l'ip du pc qui host l'API (ou peut-être localhost si android studio ? jsp)
  const BASE_URL = "http://192.168.0.20:3001/v1";

  /*useEffect(() => {
    login().then(() => {
      getAllFoodFromDB();
    });
  }, []);

  // Déplacer dans login tout ce qui suit //

  const [email, setEmail] = useState('admin@test.com');
  const [password, setPassword] = useState('hello');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = async () => {
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', 
        body: JSON.stringify({ email, password }), 
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        setError(errorData.message || 'Identifiants invalides ou erreur serveur.');
        return;
      }
    } catch (err) {
      console.error("Erreur durant la connexion:", err);
      const handledError = err;
      setError(handledError.message);
    } finally {

      setIsLoading(false);
    }
  };

  // fin de ce qu'il faut déplacer //
  */

  function buildFoodToShow(allFood, foodUser) {
    return foodUser.map(userFood => {
      const food = allFood.find(f => f.id === userFood.food);

      if (!food) return null;

      return {
        idFood: food.id,
        labelFood: food.label,
        dietFood: food.diet,
        nutriscoreFood: food.nutriscore,
        measuringunit: food.measuringunit,
        barcode: food.barcode,
        imagepath: food.imagepath,
        quantity: userFood.quantity,
        storagetype: userFood.storagetype,
        expirationdate: userFood.expirationdate,
      };
    }).filter(Boolean);
  }

  function getAllFoodFromDB() {
    Promise.all([
      fetch(`${BASE_URL}/food/all`).then(res => res.json()),
      fetch(`${BASE_URL}/foodUser/me`).then(res => res.json())
    ])
    .then(([allFoodData, foodUserData]) => {
      const mergedFood = buildFoodToShow(allFoodData, foodUserData);
      setAllFoodToShow(mergedFood);
    })
    .catch(err => {
      console.error(err);
      setAllFoodToShow([]);
    });
  }

  function resetFilters() {
    setFilters({
      estPerime: false,
      storageType: null,
      nutriScore: null,
    });
  };

  // Remplacer par les fetchs de l'API
  let mockUsername = "Patron"

  const filteredData = foodToshow.filter(item => {
      if (searchQuery && !item.labelFood.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
  }

  const today = new Date();
  const expDate = new Date(item.expirationdate);
  const dayBeforeExpiration = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));
  if (filters.estPerime && (dayBeforeExpiration >= 0)) {
    return false;
  }

  if (filters.storageType && item.storagetype !== filters.storageType) {
    return false;
  }

  if (filters.nutriScore && item.nutriscoreFood !== filters.nutriScore) {
    return false;
  }

  return true;
});


  const toggleModal = () => {
    setFilterVisible(!isFilterVisible);
  };

  return showAddOrUpdateFood ? (
    <AddOrUpdateFood onClose={() => setShowAddOrUpdateFood(false)} isAnAdd={true}/>
  ) : ( showReadFood ? (
    <ReadFood onClose={() => setShowReadFood(false)} data={selectedFood} />
  ) : (
    <View style={styles.containerScreen}>
      <Text style={styles.title}>Bonjour {mockUsername},</Text>
      <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} toggleFilter={toggleModal}/>
      <ScrollView  style={styles.containerContent} showsVerticalScrollIndicator={false}>
        {filteredData.map((item, index) => (
          <TouchableOpacity key={index} onPress={() => {setSelectedFood(item); setShowReadFood(true)}}>
            <FoodItem {...item} />
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity 
        style={styles.fab}
        onPress={() => setShowAddOrUpdateFood(true)}
      >
        <FontAwesomeIcon icon={faPlus} size={24} color="white" />
      </TouchableOpacity>
      <Filter
        isFilterVisible={isFilterVisible}
        toggleFilter={toggleModal}
        filters={filters}
        setFilters={setFilters}
        onReset={resetFilters}
      />
    </View>
  )
  );
};