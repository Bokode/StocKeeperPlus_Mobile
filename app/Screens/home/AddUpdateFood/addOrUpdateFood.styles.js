import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    backgroundColor: "#ecf3fe"
  },
  title: {
    fontSize: 30,
    fontWeight: "bold"
  },
  lineBarcode: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  inputContainer: {
    backgroundColor: "white",
    width: "90%",
    marginTop: 40,
    paddingTop: 40,
    padding: 10,
    borderRadius: 10
  },
  searchSectionBarcode: {
    width: "88%",
    marginBottom: 0,
  },
  searchSection: {
    border: 1,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "lightgrey",
    borderRadius: 10,
    marginBottom: 30,
    paddingLeft: 10,
  },
  input: {
    flex: 1,
    height: 40,
    paddingLeft: 10
  },
  confirmButton: {
    backgroundColor: "#4379de",
    marginTop: 30
  },
  button: {
    alignItems: "center",
    marginBottom: 20,
    padding: 14,
    borderRadius: 10
  },
  text: {
    fontWeight: "800",
    fontSize: 16
  },
  confirmText: {
    color: "white",
  },
  cancelText: {
    color: "#4379de"
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
  containerCamera: {
    position: "absolute",
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0,
    zIndex: 999
  },
   modalDelete: {
    height: "20%",
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
    fontSize: 15,
  },
  buttonModal: {
    backgroundColor: "#4379de",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonText: {
    color: "white",
    fontWeight: "bold"
  },
});

export default styles;