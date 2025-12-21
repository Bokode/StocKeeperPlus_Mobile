import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backgroundImage: {
    justifyContent: 'flex-start',
    height: 225,
    paddingTop: 40
  },
  container: {
    height: "100%",
    backgroundColor: "#ecf3fe",
  },
  topContainer: {
    width: "100%",
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingInline: 10,
    marginBottom: 10,
  },
  updateLine: {
    justifyContent: "flex-end",
  },
  button: {
    backgroundColor: "white",
    borderRadius: 6,
    padding: 12
  },
  containerContent: {
    marginTop: -40,
    paddingTop: 30,
    borderRadius: 40,
    height: "100%",
    backgroundColor: "white",
    paddingInlineStart: 26
  },
  title: {
    fontWeight: "bold",
    fontSize: 35,
    marginBottom: 15
  },
  description: {
    marginBottom: 25,
    paddingInlineEnd: 26,
  },
  rowMiniTitle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  miniTitle: {
    fontWeight: "bold",
    fontSize: 16,
  },
  textData: {
    color: "grey"
  },
  nutriScoreImage: {
    marginTop: 15,
    width: 100,
    height: 55,
  },
  modalDelete: {
    height: "24%",
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
    marginBottom: 20
  },
  buttonModalYes: {
    backgroundColor: "#4379de",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonModalNo: {
    backgroundColor: "white",
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center"
  },
  buttonTextYes: {
    color: "white",
    fontWeight: "bold"
  },
  buttonTextNo: {
    color: "#3962ac",
    fontWeight: "bold"
  }
});

export default styles;