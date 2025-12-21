import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  img: {
    width: 105,
    height: 105,
    borderRadius: 8,
    margin: 4,
    marginRight: 15
  },
  textContainer: {
    flex: 1
  },
  labelIconContainer: {
    flexDirection: 'row', 
    alignItems: "center", 
    justifyContent: "space-between",
    paddingRight: 15,
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
    flex: 1,
    marginRight: 10,
  },
  infoText: {
    color: "grey",
  },
  quantityBadge: {
    position: 'absolute',
    left: 108,
    top: '20%',
    transform: [{ translateX: -16 }, { translateY: -10 }],
    width: 32,
    height: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    zIndex: 10,
  },

  quantityText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  }
});


export default styles;