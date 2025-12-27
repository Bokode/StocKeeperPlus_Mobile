import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

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
  },
  carouselContainer: {
    marginTop: 15,
    height: 180,
    marginBottom: 20,
  },
  carouselCard: {
    width: width * 0.65,
    marginRight: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
    shadowColor: '#4379de',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    overflow: 'hidden',
  },
  cardHeader: {
    backgroundColor: '#ecf3fe',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eef2f5',
  },
  carouselTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    textAlign: 'left',
  },
  cardBody: {
    padding: 15,
    justifyContent: 'space-around',
    flex: 1,
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  iconContainer: {
    width: 28,
    alignItems: 'center',
    marginRight: 8,
  },
  carouselText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
});

export default styles;