import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#eee'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-evenly', 
    height: 90 
  },
  labelIconContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 4,
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#1c1b1f',
    flex: 1,       
    marginRight: 10 
  },
  infoRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: 2
  },
  infoText: {
    color: "grey",
    fontSize: 14,
  }
});

export default styles;