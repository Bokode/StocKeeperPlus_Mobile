import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  containerScreen: {
    flex: 1,
    paddingTop: 40,
    paddingInline: 20,
    backgroundColor: '#f7f9fd'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15
  },
  containerContent: {
    marginTop: 15
  },
  fab: {
    position: 'absolute',
    bottom: 25,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#4379de',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
})

export default styles;