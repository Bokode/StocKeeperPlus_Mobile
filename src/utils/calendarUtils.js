// src/utils/calendarUtils.js

const getStatusColor = (expirationDate) => {
  const today = new Date();
  const expDate = new Date(expirationDate);

  today.setHours(0, 0, 0, 0);
  expDate.setHours(0, 0, 0, 0);

  const diffTime = expDate - today;
  const dayBeforeExpiration = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (dayBeforeExpiration > 4) return '#76cc77'; 
  if (dayBeforeExpiration >= 0) return '#f3ce60'; 
  return '#bb413b'; 
};

export const getMarkedDates = (items, selectedDate) => {
  const markedDates = {};

  items.forEach((item) => {
    
    const color = getStatusColor(item.expirationDate);

    markedDates[item.expirationDate] = {
      customStyles: {
        container: {
          borderWidth: 2,
          borderColor: color,
          backgroundColor: 'transparent',
          borderRadius: 20,
        },
        text: {
          color: 'black',
          fontWeight: '500',
        },
      },
    };
  });

  
  if (selectedDate) {
    markedDates[selectedDate] = {
      ...markedDates[selectedDate],
      customStyles: {
        container: {
          backgroundColor: '#2E66E7',
          borderRadius: 10,
          borderWidth: 0,
          elevation: 4,
        },
        text: {
          color: 'white',
          fontWeight: 'bold',
        },
      },
    };
  }

  return markedDates;
};

