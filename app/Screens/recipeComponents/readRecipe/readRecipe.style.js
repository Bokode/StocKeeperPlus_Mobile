import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ecf3fe", // Fond bleu clair cohérent avec le reste de l'app
  },
  // --- HEADER ---
  backgroundImage: {
    height: 250,
    paddingTop: 40,
    justifyContent: 'flex-start',
  },
  topContainer: {
    width: "100%",
  },
  line: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
  },
  button: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    elevation: 2,
  },
  // --- WIDGET SCORE CENTRAL ---
  scoreContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40,
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.2)', // Effet de verre
    borderWidth: 2,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreNumber: {
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  scoreLabel: {
    color: 'white',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  // --- CONTENU BLANC ---
  containerContent: {
    flex: 1,
    marginTop: -40,
    paddingTop: 30,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    backgroundColor: "white",
    paddingHorizontal: 26,
  },
  title: {
    fontWeight: "bold",
    fontSize: 28,
    marginBottom: 20,
    color: "#1c1b1f",
  },
  // --- BLOCS INFOS (PERS / TEMPS / KCAL) ---
  infoBlocksContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  infoBlock: {
    backgroundColor: '#f7f9fd',
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: 'center',
    width: '30%',
  },
  infoBlockText: {
    marginTop: 8,
    fontWeight: "bold",
    fontSize: 13,
    color: "#1c1b1f",
  },
  // --- ONGLETS (TABS) ---
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 3,
    borderBottomColor: '#4379de',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: 'grey',
  },
  activeTabText: {
    color: '#4379de',
  },
  // --- LISTE INGRÉDIENTS ---
  ingredientsList: {
    marginTop: 5,
  },
  ingredientRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f8f8f8',
  },
  ingredientLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  stockIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 15,
  },
  ingredientLabel: {
    fontSize: 16,
    color: '#1c1b1f',
  },
  ingredientQuantity: {
    fontSize: 14,
    color: 'grey',
    fontWeight: 'bold',
  },
  // --- PRÉPARATION / DESCRIPTION ---
  descriptionText: {
    fontSize: 16,
    lineHeight: 24,
    color: '#49454f',
    textAlign: 'justify',
  },
  placeholderText: {
    textAlign: 'center',
    marginTop: 30,
    color: 'grey',
    fontStyle: 'italic',
  },
});

export default styles;