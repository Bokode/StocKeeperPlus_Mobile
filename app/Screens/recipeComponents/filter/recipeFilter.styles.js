import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  modalFilter: {
    width: "90%",
    alignSelf: "center",
    borderRadius: 10,
    padding: 20,
    backgroundColor: "white",
    zIndex: 1, 
  },
  textModal: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 20
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    marginBottom: 20,
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
  dropdownScroll: {
    maxHeight: 200,
  },
  dropdownItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    marginBottom: 30,
    zIndex: -1 
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: "#1c1b1f",
  },
  resetButton: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#4379de",
    marginBottom: 10,
  },
  resetButtonText: {
    color: "#4379de",
    fontWeight: "600",
  },
  buttonModal: {
    backgroundColor: "#4379de",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  }
});

export default styles;