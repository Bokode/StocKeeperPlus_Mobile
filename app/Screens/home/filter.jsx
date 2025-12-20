import { faBoxArchive } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Modal from 'react-native-modal';

const Filter = ({ toggleFilter, isFilterVisible, filters, setFilters, onReset }) => {
  const [showStorageMenu, setShowStorageMenu] = useState(false);
  const [showNutriScoreMenu, setNutriScoreMenu] = useState(false);
  const storageOptions = ["Placard", "Frigo", "Congélateur", "Corbeille", "Armoire"];
  const nutriSCoreOptions = ["A", "B", "C", "D", "E"];
  
  return (
  <Modal isVisible={isFilterVisible}>
    <View style={styles.modalFilter}>
      <Text style={styles.textModal}>
        Chossissez vos filtres
      </Text>
      <View style={styles.searchSection}>
        <FontAwesomeIcon icon={faBoxArchive} size={20} color="#1c1b1f"/>
        <TouchableOpacity
          style={{ flex: 1, paddingVertical: 12, paddingLeft: 10 }}
          onPress={() => setShowStorageMenu(!showStorageMenu)}
        >
          <Text style={{ color: filters.storageType ? "#1c1b1f" : "grey" }}>
            {filters.storageType || "Type de stockage"}
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
                    setFilters(prev => ({ ...prev, storageType: option }));
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
      <View style={styles.searchSection}>
        <FontAwesomeIcon icon={faBoxArchive} size={20} color="#1c1b1f"/>
        <TouchableOpacity
          style={{ flex: 1, paddingVertical: 12, paddingLeft: 10 }}
          onPress={() => setNutriScoreMenu(!showNutriScoreMenu)}
        >
          <Text style={{ color: filters.nutriScore ? "#1c1b1f" : "grey" }}>
            {filters.nutriScore || "NutriScore"}
          </Text>
        </TouchableOpacity>
        {showNutriScoreMenu && (
          <View style={styles.dropdown}>
            <ScrollView style={styles.dropdownScroll}>
              {nutriSCoreOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  style={styles.dropdownItem}
                  onPress={() => {
                    setFilters(prev => ({ ...prev, nutriScore: option }));
                    setNutriScoreMenu(false);
                  }}
                >
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}
      </View>
      <View style={styles.checkboxRow}>
        <Checkbox
          value={filters.estPerime}
          onValueChange={(value) =>
            setFilters(prev => ({ ...prev, estPerime: value }))
          }
          color={filters.estPerime ? "#4379de" : undefined}
        />
        <Text style={styles.checkboxLabel}>
          Produits périmés
        </Text>
      </View>
      <TouchableOpacity
  style={styles.resetButton}
  onPress={onReset}
>
  <Text style={styles.resetButtonText}>
    Réinitialiser les filtres
  </Text>
</TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonModal}
        onPress={toggleFilter}
      >
        <Text style={styles.buttonText}>
          Confirmer
        </Text>
      </TouchableOpacity>
      </View>
    </Modal>
  )
};

const styles = StyleSheet.create({
  modalFilter: {
    height: "50%",
    width: "90%",
    margin: "auto",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "white",
    justifyContent: "space-around"
  },
  textModal: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 20
  },
  buttonModal: {
    backgroundColor: "#4379de",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
  searchSection: {
    border: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
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
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    marginBottom: 30,
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: "#1c1b1f",
  },
  resetButton: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4379de",
    marginBottom: 10,
  },
  resetButtonText: {
    color: "#4379de",
    fontWeight: "600",
  },
})

export default Filter;