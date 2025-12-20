import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  img: {
    width: 105,
    height: 105,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#eee'
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: 90
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 4,
    color: '#1c1b1f'
  },
  infoRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginBottom: 2
  },
  icon: {
    marginRight: 8,
  },
  infoText: {
    color: "#49454F",
    fontSize: 14,
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 2
  }
});

export default styles;