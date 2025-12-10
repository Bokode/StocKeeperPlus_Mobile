import { StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const SearchBar = ({ searchQuery, onSearchChange }) => {
  return (
    <Searchbar
      style={styles.searchbar}
      placeholder="Rechercher ..."
      onChangeText={onSearchChange}
      value={searchQuery}
    />
  );
};

const styles = StyleSheet.create({
  searchbar: {
    backgroundColor: 'white',
    borderRadius: 10
  }
})

export default SearchBar;