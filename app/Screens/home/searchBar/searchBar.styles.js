import { StyleSheet } from 'react-native';

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

export default styles;