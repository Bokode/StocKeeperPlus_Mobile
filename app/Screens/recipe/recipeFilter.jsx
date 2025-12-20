import { faChevronDown, faClock, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import Checkbox from 'expo-checkbox';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard} from 'react-native';
import Modal from 'react-native-modal';

import { styles } from './_recipeFilter.styles';

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

export default RecipeFilter;