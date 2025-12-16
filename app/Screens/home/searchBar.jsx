import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Searchbar } from 'react-native-paper';

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


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  searchbar: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10
  },
  filterButton: {
    marginLeft: 10,
    padding: 12,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 2
  }
});
