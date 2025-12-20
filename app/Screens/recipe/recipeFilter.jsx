import { faChevronDown, faClock, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import {  
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  TouchableWithoutFeedback, 
  View, 
  Keyboard 
} from 'react-native';
import Modal from 'react-native-modal';

const RecipeFilter = ({ toggleFilter, isFilterVisible, filters, setFilters, onReset }) => {
  const [showTimeMenu, setShowTimeMenu] = useState(false);

  const timeOptions = [
    { label: "< 15 min", value: 15 },
    { label: "< 30 min", value: 30 },
    { label: "< 45 min", value: 45 },
    { label: "< 1 h", value: 60 }
  ];

  const getSelectedTimeLabel = () => {
    const found = timeOptions.find(opt => opt.value === filters.maxTime);
    return found ? found.label : "Temps maximum";
  };

  // Clic à côté = ferme la liste du temps de préparation -> Dédicace à la team Augustin
  const closeDropdown = () => {
    if (showTimeMenu) setShowTimeMenu(false);
    Keyboard.dismiss();
  };

  return (
    <Modal 
      isVisible={isFilterVisible} 
      // onBackdropPress={toggleFilter} <-- si on veut fermer le popup en cliquant à côté, pertinent ?
      avoidKeyboard={true}
    >
      {/* TouchableWithoutFeedback permet de faire plaisir à Augustin */}
      <TouchableWithoutFeedback onPress={closeDropdown}>
        <View style={styles.modalFilter}>
            <Text style={styles.textModal}>Filtrer les recettes</Text>

            {/* --- INPUT : Nombre de personnes --- */}
            <View style={styles.searchSection}>
                <FontAwesomeIcon icon={faUserGroup} size={20} color="#1c1b1f" />
                <TextInput
                    style={styles.input}
                    placeholder="Nombre de personnes"
                    keyboardType="numeric"
                    value={filters.nbEaters}
                    onChangeText={(text) => {
                    const numericText = text.replace(/[^0-9]/g, '');
                    setFilters(prev => ({ ...prev, nbEaters: numericText }));
                }}
                onFocus={() => setShowTimeMenu(false)}
                />
            </View>

          {/* --- DROPDOWN : Temps de préparation --- */}
          <View style={[styles.searchSection, { zIndex: 10 }]}> 
            <FontAwesomeIcon icon={faClock} size={20} color="#1c1b1f" />
            
            <TouchableOpacity
              style={styles.dropdownTrigger}
              onPress={() => {
                Keyboard.dismiss();
                setShowTimeMenu(!showTimeMenu);
              }}
            >
              <Text style={{ color: filters.maxTime ? "#1c1b1f" : "grey", flex: 1 }}>
                {getSelectedTimeLabel()}
              </Text>
              <FontAwesomeIcon icon={faChevronDown} size={12} color="grey" />
            </TouchableOpacity>
            
            {showTimeMenu && (
                <View style={styles.dropdown}>
                    {timeOptions.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            style={styles.dropdownItem}
                            onPress={() => {
                                setFilters(prev => ({ ...prev, maxTime: option.value }));
                                setShowTimeMenu(false);
                            }}
                        >
                        <Text>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
          </View>

          {/* --- CHECKBOX : Recettes Faisables --- */}
          <TouchableOpacity 
            style={styles.checkboxRow} 
            activeOpacity={1} 
            onPress={() => {
                // MODIF : Ferme aussi le menu si on clique sur la zone checkbox
                setShowTimeMenu(false);
                setFilters(prev => ({ ...prev, isDoableOnly: !prev.isDoableOnly }));
            }}
          >
            <Checkbox
              value={filters.isDoableOnly}
              onValueChange={(value) => {
                setShowTimeMenu(false);
                setFilters(prev => ({ ...prev, isDoableOnly: value }));
              }}
              color={filters.isDoableOnly ? "#4379de" : undefined}
            />
            <Text style={styles.checkboxLabel}>
              Recettes Faisables
            </Text>
          </TouchableOpacity>

          {/* --- BOUTONS --- */}
          <TouchableOpacity 
            style={styles.resetButton} 
            onPress={() => {
                closeDropdown();
                onReset();
            }}
          >
            <Text style={styles.resetButtonText}>Réinitialiser les filtres</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.buttonModal} 
            onPress={() => {
                closeDropdown();
                toggleFilter();
            }}
          >
            <Text style={styles.buttonText}>Confirmer</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalFilter: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "white",
    // Assure que le modal est au-dessus
    zIndex: 1, 
  },
  textModal: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 20
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
    height: 50,
    position: 'relative' // Nécessaire pour le dropdown absolute
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    height: "100%",
    color: "#1c1b1f"
  },
  // Nouveau style pour la zone cliquable du dropdown
  dropdownTrigger: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between', // Pousse la flèche à droite
    paddingVertical: 12, 
    paddingHorizontal: 10 
  },
  dropdown: {
    position: 'absolute',
    top: '100%', // Juste en dessous du champ
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    // Ombre pour bien détacher la liste
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 9999, // Très haut pour passer au-dessus de tout
  },
  dropdownItem: {
    padding: 15, // Zone de clic plus confortable
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    marginBottom: 30,
    zIndex: -1 // Pour être sûr qu'il passe SOUS le dropdown
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
  buttonModal: {
    backgroundColor: "#4379de",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
});

export default RecipeFilter;