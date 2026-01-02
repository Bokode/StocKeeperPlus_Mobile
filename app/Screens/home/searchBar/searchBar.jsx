import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { TouchableOpacity, View } from 'react-native';
import { Searchbar } from 'react-native-paper';
import styles from "./searchBar.styles"

export default function SearchBar({ searchQuery, onSearchChange, toggleFilter }) {
  return (
    <View style={styles.container}>
      <Searchbar
        style={styles.searchbar}
        placeholder="Rechercher ..."
        value={searchQuery}
        onChangeText={onSearchChange}
      />

      <TouchableOpacity
        style={styles.filterButton}
        onPress={toggleFilter}
      >
        <FontAwesomeIcon
          icon={faFilter}
          size={22}
          color="#555"
        />
      </TouchableOpacity>
    </View>
  );
};