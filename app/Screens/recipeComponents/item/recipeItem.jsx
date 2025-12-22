import { faCheckCircle, faClock, faTimesCircle, faUserGroup } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Image, Text, View } from "react-native";

import styles from './recipeItem.style';

const RecipeItem = ({ label, nbeaters, timetomake }) => {
  
  // Logique : si temps pair = faisable
  const isDoable = timetomake % 2 !== 0; 
  
  const statusColor = isDoable ? "#76cc77" : "#bb413b";
  const statusIcon = isDoable ? faCheckCircle : faTimesCircle;

  return (
    <View style={styles.card}>
      <Image 
        style={styles.img} 
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
      />
      
      <View style={styles.textContainer}>
        <View style={styles.labelIconContainer}>
          <Text style={styles.label} numberOfLines={1} ellipsizeMode='tail'>
            {label}
          </Text>
          <FontAwesomeIcon icon={statusIcon} size={25} color={statusColor}/>
        </View>

        <View style={styles.infoRow}>
          <FontAwesomeIcon icon={faUserGroup} size={14} color="grey" style={{ marginRight: 5 }} />
          <Text style={styles.infoText}>{nbeaters} personnes</Text>
        </View>

        <View style={styles.infoRow}>
          <FontAwesomeIcon icon={faClock} size={14} color="grey" style={{ marginRight: 5 }} />
          <Text style={styles.infoText}>{timetomake}m</Text>
        </View>
        
      </View>
    </View>
  );
};

export default RecipeItem;