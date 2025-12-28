import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    paddingTop: 25,
    paddingInline: 20,
    backgroundColor: '#f7f9fd',
    marginTop: -30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  containerContent: {
    marginTop: 15
  },
  noResultText: {
    textAlign: 'center',
    color: 'grey',
    marginTop: 20,
    fontSize: 16
  }
});

export default styles;