import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable
} from 'react-native';
import { Calendar } from 'react-native-calendars';

import FoodItem from '../home/foodItem/foodItem';
import ReadFood from '../home/readFood/readFood';
import styles from './calendar.styles';

import { getMarkedDates } from '../../../src/utils/calendarUtils';
import { getTodayDateString } from '../../../src/utils/dateHelpers';
import { BASE_URL } from '../../config/config';
import { useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { FoodContext } from '../../context/foodContext';


const CalendarScreen = () => {
  const today = getTodayDateString();
  
  const { foodToShow, setFoodToShow } = useContext(FoodContext);

  const [selectedDate, setSelectedDate] = useState(today);
  const [showAllItems, setShowAllItems] = useState(true);
  const [showReadFood, setShowReadFood] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const getAllFoodFromDB = useCallback(() => {
    Promise.all([
      fetch(`${BASE_URL}/food/all`).then(res => res.json()),
      fetch(`${BASE_URL}/foodUser/me`).then(res => res.json())
    ])
    .then(([allFoodData, foodUserData]) => {
      const mergedFood = buildFoodToShow(allFoodData, foodUserData);
      setFoodToShow(mergedFood);
    })
    .catch(error => {
      console.error("Erreur chargement calendrier:", error);
      setFoodToShow([]);
    });
  }, []);

  useEffect(() => {
    if (!foodToShow || foodToShow.length === 0) {
      getAllFoodFromDB();
    }
  }, [foodToShow, getAllFoodFromDB]);


  function buildFoodToShow(allFood, foodUser) {
    return foodUser.map(userFood => {
      const food = allFood.find(f => f.id === userFood.food);

      if (!food) return null;

      return {
        id: userFood.id, 
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

  function updateFoodFromDB(content) {
    fetch(`${BASE_URL}/foodUser/me`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    })
    .then(() => getAllFoodFromDB())
    .catch(error => console.error(error));
  }

  function addFoodFromDB(content) {
    fetch(`${BASE_URL}/foodUser/me`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content)
    })
    .then(() => getAllFoodFromDB())
    .catch(error => console.error(error));
  }

  const markedDates = useMemo(() => {
    return getMarkedDates(foodToShow, selectedDate);
  }, [foodToShow, selectedDate]);

  const filteredItems = useMemo(() => {
    return foodToShow.filter(item => item.expirationdate === selectedDate);
  }, [foodToShow, selectedDate]);

  const allItemsSorted = useMemo(() => {
    return [...foodToShow].sort((a, b) => 
      new Date(a.expirationdate) - new Date(b.expirationdate)
    );
  }, [foodToShow]);

  const dataToDisplay = showAllItems ? allItemsSorted : filteredItems;

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setShowAllItems(false); 
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendarWrapper}>
        <Calendar
          current={today}
          onDayPress={handleDayPress} 
          markingType={'custom'}
          markedDates={markedDates}
          theme={{
            backgroundColor: '#ffffffff',
            calendarBackground: '#ffffffff',
            textSectionTitleColor: '#B0B5C6',
            selectedDayBackgroundColor: '#2E66E7',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#2E66E7',
            dayTextColor: '#2d4150',
            arrowColor: '#2E66E7',
            monthTextColor: '#1A1A1A',
            textDayFontWeight: '500',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '600',
            textDayFontSize: 14,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 12,
          }}
        />
      </View>

      <View style={styles.listContainer}>
        <View style={styles.headerRow}>
          <Text style={styles.listHeader}>
            {showAllItems 
              ? "Tous les produits" 
              : `Expirations : ${selectedDate.split('-').reverse().join('/')}`
            }
          </Text>

          <TouchableOpacity 
            style={styles.toggleButton} 
            onPress={() => setShowAllItems(!showAllItems)}
          >
            <Text style={styles.toggleButtonText}>
              {showAllItems ? "Voir le jour" : "Voir tout"}
            </Text>
          </TouchableOpacity>
        </View>
        
        <FlatList
          data={dataToDisplay}
          // Assurez-vous que votre objet a bien une clé unique (id ou idFood)
          keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
          contentContainerStyle={{ paddingBottom: 20 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                setSelectedFood(item);
                setShowReadFood(true);
              }}
              style={({ pressed }) => [
                {
                  transform: [{ scale: pressed ? 0.96 : 1 }],
                  opacity: pressed ? 0.9 : 1,
                }
              ]}
            >
              <FoodItem {...item} />
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Rien à signaler ! 🍃</Text>
            </View>
          }
        />
      </View>

      <Modal
        visible={showReadFood}       
        animationType="slide"        
        presentationStyle="pageSheet" 
        onRequestClose={() => setShowReadFood(false)} 
      >
        {selectedFood && (
          <ReadFood 
            data={selectedFood} 
            onClose={() => setShowReadFood(false)} 
            // Ajout des props pour permettre l'édition comme dans Home
            updateFoodFromDB={updateFoodFromDB} 
            addFoodFromDB={addFoodFromDB}
            onRefresh={getAllFoodFromDB}
          />
        )}
      </Modal>
      
    </View>
  );
};

export default CalendarScreen;