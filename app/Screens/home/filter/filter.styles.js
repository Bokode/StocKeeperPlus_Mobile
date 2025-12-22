import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  modalFilter: {
    height: "50%",
    width: "90%",
    margin: "auto",
    borderRadius: 10,
    padding: 15,
    backgroundColor: "white",
    justifyContent: "space-around"
  },
  textModal: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 18,
    marginBottom: 20
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
  },
  searchSection: {
    border: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    marginBottom: 20,
    paddingLeft: 10,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 8,
    overflow: "hidden",
    zIndex: 1000,
  },
  dropdownScroll: {
    maxHeight: 140,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "lightgrey",
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 5,
    marginBottom: 30,
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
})

export default styles;