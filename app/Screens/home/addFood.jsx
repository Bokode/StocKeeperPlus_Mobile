import { faBarcode, faBoxArchive, faCalendar, faCamera, faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useState } from 'react';
import { Keyboard, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Camera from './camera';

const AddFood = ({ onClose }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [quantityValue, setQuantityValue] = useState("");
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [storageType, setStorageType] = useState(null);
  const [showStorageMenu, setShowStorageMenu] = useState(false);
  const storageOptions = ["Placard", "Frigo", "Congélateur", "Corbeille", "Armoire"];

  const handleChangeQuantity = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setQuantityValue(numericValue);
  };

  const handleChangeBarcode = (text) => {
    const numericValue = text.replace(/[^0-9]/g, "");
    setBarcode(numericValue.slice(0, 13));
  };

  const onChangeDate = (event, selectedDate) => {
    setShowDatePicker(false);
    if (selectedDate) setDate(selectedDate);
  };

  return (
    <>
    <TouchableWithoutFeedback
      onPress={() => {
        setShowStorageMenu(false);
        Keyboard.dismiss();
      }}
    >
    <View style={styles.container}>
      <Text style={styles.title}>Ajout d&apos;un aliment</Text>
      <View style={styles.inputContainer}>
        <View style={styles.lineBarcode}>
          <View style={[styles.searchSection, styles.searchSectionBarcode]}>
            <FontAwesomeIcon icon={faBarcode} size={20} color="#1c1b1f"/>
            <TextInput 
              style={styles.input} 
              placeholder="Barcode" 
              value={barcode}
              onChangeText={handleChangeBarcode}
              keyboardType="numeric"
            />
          </View>
          <TouchableOpacity onPress={() => setShowCamera(true)}
          >
            <FontAwesomeIcon icon={faCamera} size={20} color="#1c1b1f" style={{marginRight: 6}}/>
          </TouchableOpacity>
        </View>
        <View style={styles.searchSection}>
          <FontAwesomeIcon icon={faWeightScale} size={20} color="#1c1b1f"/>
          <TextInput
            style={styles.input}
            placeholder="Quantité"
            onChangeText={handleChangeQuantity}
            value={quantityValue}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.searchSection}>
          <FontAwesomeIcon icon={faCalendar} size={20} color="#1c1b1f"/>
          <TouchableOpacity
            style={{ flex: 1, paddingVertical: 10, paddingLeft: 10 }}
            onPress={() => setShowDatePicker(true)}
          >
             <Text style={{ color: date ? "#1c1b1f" : "grey" }}>
                {date ? date.toLocaleDateString() : "Date d'expiration"}
              </Text>
          </TouchableOpacity>
        </View>
        <View style={styles.searchSection}>
          <FontAwesomeIcon icon={faBoxArchive} size={20} color="#1c1b1f"/>
          <TouchableOpacity
            style={{ flex: 1, paddingVertical: 12, paddingLeft: 10 }}
            onPress={() => setShowStorageMenu(!showStorageMenu)}
          >
            <Text style={{ color: storageType ? "#1c1b1f" : "grey" }}>
              {storageType || "Type de stockage"}
            </Text>
          </TouchableOpacity>
          {showStorageMenu && (
          <View style={styles.dropdown}>
            <ScrollView style={styles.dropdownScroll}>
              {storageOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setStorageType(option);
                    setShowStorageMenu(false);
                  }}
                >
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={date || new Date()} 
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        

        <TouchableOpacity onPress={onClose} style={[styles.button, styles.confirmButton]}>
          <Text style={[styles.text, styles.confirmText]}>Confirmer</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.button}>
          <Text style={[styles.text, styles.cancelText]}>Annuler</Text>
        </TouchableOpacity>

      </View>
    </View>
    </TouchableWithoutFeedback>
    {showCamera && (
      <View style={styles.containerCamera}>
        <Camera 
          onClose={() => setShowCamera(false)}
          onBarcodeScanned={(code) => {setBarcode(code);}}
        />
      </View>
    )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#ecf3fe"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  lineBarcode: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: "white",
    width: "90%",
    marginTop: 40,
    paddingTop: 40,
    padding: 10,
    borderRadius: 10
  },
  searchSectionBarcode: {
    width: "88%",
    marginBottom: 0,
  },
  searchSection: {
    border: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    marginBottom: 30,
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10
  },
  confirmButton: {
    backgroundColor: "#4379de",
    marginTop: 30
  },
  button: {
    alignItems: "center",
    marginBottom: 20,
    padding: 14,
    borderRadius: 10
  },
  text: {
    fontWeight: "800",
    fontSize: 16
  },
  confirmText: {
    color: "white",
  },
  cancelText: {
    color: "#4379de"
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8,
    overflow: "hidden",
    zIndex: 1000,
  },
  dropdownScroll: {
    maxHeight: 140,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  containerCamera: {
    position: "absolute",
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
    zIndex: 999
  }
});

export default AddFood;