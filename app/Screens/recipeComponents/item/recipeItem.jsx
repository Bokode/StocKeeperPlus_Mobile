import { faClock, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Image, Text, View } from "react-native";

import styles from './recipeItem.style';

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

export default RecipeItem;