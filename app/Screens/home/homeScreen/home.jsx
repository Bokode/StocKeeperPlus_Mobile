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
import { BASE_URL } from '../../../config/config';

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

  let mockUsername = "Patron"

  useEffect(() => {
    getAllFoodFromDB();
  }, []);
 
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
        userMail: userFood.user_mail,
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
    .catch(error => {
      console.error(error);
      setAllFoodToShow([]);
    });
  }

  function addFoodFromDB(content) {
    fetch(`${BASE_URL}/foodUser/me`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    })
    .then(() => getAllFoodFromDB())
    .catch(error => {
      console.error(error);
    });
  }

  function updateFoodFromDB(content) {
    fetch(`${BASE_URL}/foodUser/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(content)
    })
    .then(() => getAllFoodFromDB())
    .catch(error => {
      console.error(error);
    });
  }

  function resetFilters() {
    setFilters({
      estPerime: false,
      storageType: null,
      nutriScore: null,
    });
  };

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
    <AddOrUpdateFood 
      onClose={() => setShowAddOrUpdateFood(false)} 
      isAnAdd={true} 
      updateFoodFromDB={updateFoodFromDB} 
      addFoodFromDB={addFoodFromDB}
      //onRefresh={getAllFoodFromDB}
    />
  ) : ( showReadFood ? (
    <ReadFood 
      onClose={() => setShowReadFood(false)} 
      data={selectedFood} 
      updateFoodFromDB={updateFoodFromDB} 
      addFoodFromDB={addFoodFromDB}
      onRefresh={getAllFoodFromDB}
    />
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