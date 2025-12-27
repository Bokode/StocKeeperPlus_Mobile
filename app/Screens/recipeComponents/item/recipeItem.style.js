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
  
  widgetContainer: {
    width: 105, 
    height: 105,
    margin: 4,
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center'
  },
  
  widgetContent: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%'
  },
  percentageText: {
    fontSize: 16, 
    fontWeight: 'bold',
    color: '#1c1b1f',
    marginTop: 2
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
    paddingRight: 15
  },
  label: {
    fontSize: 20,
    fontWeight: "bold",
    color: '#1c1b1f',
    flex: 1,       
    marginRight: 10,
    flexShrink: 1,
  },
  infoRow: {
    flexDirection: 'row', 
    alignItems: 'center',
    marginTop: 2
  },
  infoText: {
    color: "grey",
    fontSize: 14
  }
});

export default styles;