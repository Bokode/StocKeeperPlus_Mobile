import { faBarcode, faBoxArchive, faCalendar, faCamera, faWeightScale } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useEffect, useState } from 'react';
import { Keyboard, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import Modal from 'react-native-modal';
import Camera from '../camera/camera';
import styles from './addOrUpdateFood.styles';

export default function AddOrUpdateFood({ onClose, data }) {
  const [showCamera, setShowCamera] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [quantityValue, setQuantityValue] = useState("");
  const [date, setDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [storageType, setStorageType] = useState(null);
  const [showStorageMenu, setShowStorageMenu] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const storageOptions = ["Placard", "Frigo", "Congélateur", "Corbeille", "Armoire"];
  const regexBarcode = /^(?:\d{8}|\d{13})$/;

  useEffect(() => {
    if (data) {
      setBarcode(data.barcode ?? "");
      setQuantityValue(String(data.quantity ?? ""));
      setDate(data.expirationDate ? new Date(data.expirationDate) : null);
      setStorageType(data.storageType ?? null);
    }
  }, [data]);

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

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  function sendData() {
    if (regexBarcode.test(barcode)) {
      onClose();
      // Send data
    } else {
      toggleModal();
    }
  }

  return (
    <>
    <TouchableWithoutFeedback
      onPress={() => {
        setShowStorageMenu(false);
        Keyboard.dismiss();
      }}
    >
      <View style={styles.container}>
        <Text style={styles.title}>
          {data ? "Modifier un aliment" : "Ajout d'un aliment"}
        </Text>
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
            <TouchableOpacity onPress={() => setShowCamera(true)}>
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

          <TouchableOpacity onPress={sendData} style={[styles.button, styles.confirmButton]}>
            <Text style={[styles.text, styles.confirmText]}>Confirmer</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.button}>
            <Text style={[styles.text, styles.cancelText]}>Annuler</Text>
          </TouchableOpacity>
        </View>
        <Modal isVisible={isModalVisible}>
          <View style={styles.modalDelete}>
            <Text style={styles.textModal}>Code-barre incorrect</Text>
              <TouchableOpacity
                style={styles.buttonModal}
                onPress={toggleModal}
              >
                <Text style={styles.buttonText}>Compris</Text>
              </TouchableOpacity>
            </View>
          </Modal>
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