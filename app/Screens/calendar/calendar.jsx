import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Platform,
  StatusBar,
  TouchableOpacity,
  Modal,
  Pressable
} from 'react-native';
import { Calendar} from 'react-native-calendars';

import FoodItem from '../home/foodItem/foodItem';
import ReadFood from '../home/readFood/readFood';
import { MOCK_FOOD_ITEMS } from '../../../src/data/foodData';
import { getMarkedDates } from '../../../src/utils/calendarUtils';
import { getTodayDateString } from '../../../src/utils/dateHelpers';




const CalendarScreen = () => {
  const today = getTodayDateString();
  const [selectedDate, setSelectedDate] = useState(today);
  const [showAllItems, setShowAllItems] = useState(true);
  const [showReadFood, setShowReadFood] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  
  const markedDates = useMemo(() => {
    return getMarkedDates(MOCK_FOOD_ITEMS, selectedDate);
  }, [selectedDate]);

  
  const filteredItems = useMemo(() => {
    return MOCK_FOOD_ITEMS.filter(item => item.expirationDate === selectedDate);
  }, [selectedDate]);

  
  const allItemsSorted = useMemo(() => {
    
    return [...MOCK_FOOD_ITEMS].sort((a, b) => 
      new Date(a.expirationDate) - new Date(b.expirationDate)
    );
  }, []);

  
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
          keyExtractor={(item) => item.id.toString()}
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
          />
        )}
      </Modal>
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F6FF',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 44,
  },
  calendarWrapper: {
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
    zIndex: 1,
    backgroundColor: '#F2F6FF',
    paddingBottom: 10,
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 20,
    marginTop: 20,
  },
  
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  listHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
  },
  toggleButton: {
    backgroundColor: '#E3E9F8', 
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  toggleButtonText: {
    color: '#2E66E7', 
    fontWeight: '600',
    fontSize: 12,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#B0B5C6',
    fontStyle: 'italic',
  }
});

export default CalendarScreen;