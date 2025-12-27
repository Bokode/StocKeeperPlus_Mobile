import { faChevronDown, faClock, faUserGroup, faUtensils, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View, Keyboard} from 'react-native';
import Modal from 'react-native-modal';

import styles from './recipeFilter.styles';

const RecipeFilter = ({ toggleFilter, isFilterVisible, filters, setFilters, onReset }) => {
  const [showTimeMenu, setShowTimeMenu] = useState(false);
  const [showFeasibilityMenu, setShowFeasibilityMenu] = useState(false);

  const timeOptions = [
    { label: "< 15 min", value: 15 },
    { label: "< 30 min", value: 30 },
    { label: "< 45 min", value: 45 },
    { label: "< 1 h", value: 60 }
  ];

  const feasibilityOptions = [
    { label: "Au moins 25%", value: 25 },
    { label: "Au moins 50%", value: 50 },
    { label: "Au moins 75%", value: 75 },
    { label: "J'ai tout (100%)", value: 100 }
  ];

  const getSelectedTimeLabel = () => {
    const found = timeOptions.find(opt => opt.value === filters.maxTime);
    return found ? found.label : "Temps maximum";
  };

  const getSelectedFeasibilityLabel = () => {
    const found = feasibilityOptions.find(opt => opt.value === filters.minPercentage);
    return found ? found.label : "Faisabilité (%)";
  };

  const closeDropdown = () => {
    if (showTimeMenu) setShowTimeMenu(false);
    if (showFeasibilityMenu) setShowFeasibilityMenu(false);
    Keyboard.dismiss();
  };

  return (
    <Modal 
      isVisible={isFilterVisible} 
      avoidKeyboard={true}
    >
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
                    onFocus={() => {
                        setShowTimeMenu(false);
                        setShowFeasibilityMenu(false);
                    }}
                />
            </View>

          {/* --- DROPDOWN 1 : Temps --- */}
          <View style={[styles.searchSection, { zIndex: 20 }]}> 
            <FontAwesomeIcon icon={faClock} size={20} color="#1c1b1f" />
            <TouchableOpacity
              style={styles.dropdownTrigger}
              onPress={() => {
                Keyboard.dismiss();
                setShowFeasibilityMenu(false);
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

          {/* --- DROPDOWN 2 : Faisabilité --- */}
          <View style={[styles.searchSection, { zIndex: 10 }]}> 
            <FontAwesomeIcon icon={faUtensils} size={20} color="#1c1b1f" />
            <TouchableOpacity
              style={styles.dropdownTrigger}
              onPress={() => {
                Keyboard.dismiss();
                setShowTimeMenu(false);
                setShowFeasibilityMenu(!showFeasibilityMenu);
              }}
            >
              <Text style={{ color: filters.minPercentage !== 0 ? "#1c1b1f" : "grey", flex: 1 }}>
                {getSelectedFeasibilityLabel()}
              </Text>
              <FontAwesomeIcon icon={faChevronDown} size={12} color="grey" />
            </TouchableOpacity>
            
            {showFeasibilityMenu && (
                <View style={styles.dropdown}>
                    {feasibilityOptions.map((option) => (
                        <TouchableOpacity
                            key={option.value}
                            style={styles.dropdownItem}
                            onPress={() => {
                                setFilters(prev => ({ ...prev, minPercentage: option.value }));
                                setShowFeasibilityMenu(false);
                            }}
                        >
                        <Text>{option.label}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            )}
          </View>

          {/* --- CHECKBOX : Uniquement Favoris --- */}
          <TouchableOpacity 
            style={styles.favoriteFilterRow} 
            onPress={() => {
                closeDropdown();
                setFilters(prev => ({ ...prev, onlyFavorites: !prev.onlyFavorites }));
            }}
          >
            <View style={[
                styles.checkboxBase, 
                filters.onlyFavorites && styles.checkboxChecked
            ]}>
                {filters.onlyFavorites && <FontAwesomeIcon icon={faBookmark} size={12} color="white" />}
            </View>
            <Text style={styles.favoriteLabel}>Afficher uniquement mes favoris</Text>
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