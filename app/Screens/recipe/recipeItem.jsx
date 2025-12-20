import { faClock, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Image, StyleSheet, Text, View } from "react-native";

const RecipeItem = ({ label, nbeaters, timetomake, description }) => {
  
  // Pour la démo : si le temps de préparation est pair = faisable, sinon pas faisable
  const isDoable = timetomake % 2 !== 0; 
  
  const statusColor = isDoable ? "#76cc77" : "#bb413b";
  const statusText = isDoable ? "Faisable" : "Pas faisable";

  return (
    <View style={styles.card}>
      <Image 
        style={styles.img} 
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
      />
      
      <View style={styles.textContainer}>
        <Text style={styles.label} numberOfLines={1} ellipsizeMode='tail'>
          {label}
        </Text>

        <View style={styles.infoRow}>
          <FontAwesomeIcon icon={faUserGroup} size={14} color="#1c1b1f" style={styles.icon} />
          <Text style={styles.infoText}>{nbeaters} personnes</Text>
        </View>

        <View style={styles.infoRow}>
          <FontAwesomeIcon icon={faClock} size={14} color="#1c1b1f" style={styles.icon} />
          <Text style={styles.infoText}>{timetomake}m</Text>
        </View>

        <Text style={[styles.statusText, { color: statusColor }]}>
          {statusText}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    padding: 10, // Ajout d'un peu de padding interne
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  img: {
    width: 100, // Légèrement ajusté par rapport à FoodItem pour laisser place au texte
    height: 100,
    borderRadius: 8,
    marginRight: 15,
    backgroundColor: '#eee' // Couleur de fond si l'image charge mal
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
    height: 90 // Pour bien espacer les éléments verticalement
  },
  label: {
    fontSize: 20, // Un peu plus petit que FoodItem car titres souvent plus longs
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
    color: "#49454F", // Gris foncé (style Material Design)
    fontSize: 14,
  },
  statusText: {
    fontWeight: "bold",
    fontSize: 14,
    marginTop: 2
  }
});

export default RecipeItem;