import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalFilter: {
    width: "95%",
    alignSelf: "center",
    borderRadius: 15,
    padding: 20,
    backgroundColor: "white",
    zIndex: 1, 
  },
  textModal: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 20,
    color: "#1c1b1f"
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    marginBottom: 15,
    paddingLeft: 10,
    height: 50,
    position: 'relative'
  },
  input: {
    flex: 1,
    paddingLeft: 10,
    height: "100%",
    color: "#1c1b1f"
  },
  dropdownTrigger: {
    flex: 1, 
    flexDirection: 'row', 
    alignItems: 'center', 
    justifyContent: 'space-between',
    paddingVertical: 12, 
    paddingHorizontal: 10 
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 9999,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  // --- NOUVEAU STYLE : FILTRE FAVORIS ---
  favoriteFilterRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    marginBottom: 20,
  },
  checkboxBase: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#4379de',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  checkboxChecked: {
    backgroundColor: '#4379de',
  },
  favoriteLabel: {
    fontSize: 16,
    color: '#1c1b1f',
    fontWeight: '600',
  },
  // --- BOUTONS ---
  resetButton: {
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4379de",
    marginBottom: 12,
  },
  resetButtonText: {
    color: "#4379de",
    fontWeight: "600",
  },
  buttonModal: {
    backgroundColor: "#4379de",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  }
});

export default styles;