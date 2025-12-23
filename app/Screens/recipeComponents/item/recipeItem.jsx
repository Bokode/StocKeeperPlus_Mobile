import { faCheckCircle, faTimesCircle, faUserGroup, faClock, faUtensils, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Text, View } from "react-native";
import Svg, { Circle } from 'react-native-svg';

import styles from './recipeItem.style';

const RecipeItem = ({ id, label, isFavorite, nbeaters, timetomake }) => {
  
  // --- 1. LOGIQUE DE FAISABILITÉ (Inchangé) ---
  const isDoable = (timetomake || 0) % 2 !== 0; 
  const statusColor = isDoable ? "#76cc77" : "#bb413b";
  const statusIcon = isDoable ? faCheckCircle : faTimesCircle;

  // --- 2. LOGIQUE DU POURCENTAGE (NOUVEAU) ---
  // TODO: Plus tard, remplacer ceci par : (nbIngredientsEnStock / nbIngredientsTotal) * 100
  // Pour la démo, on simule un % stable basé sur l'ID de la recette
  const percentage = Math.min(100, Math.max(0, (id * 17) % 100 + 20)); 
  
  const progressColor = percentage >= 75 ? "#76cc77" : (percentage >= 40 ? "#f3ce60" : "#bb413b");
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.card}>
      <View style={styles.widgetContainer}>
        <View style={{ transform: [{ rotate: "-90deg" }] }}>
            <Svg width={size} height={size}>
                <Circle
                    stroke="#e6e6e6"
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                />
                <Circle
                    stroke={progressColor}
                    fill="none"
                    cx={size / 2}
                    cy={size / 2}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round" 
                />
            </Svg>
        </View>
        <View style={styles.widgetContent}>
            <FontAwesomeIcon icon={faUtensils} size={20} color="#1c1b1f" style={{marginBottom: 2}}/>
            <Text style={styles.percentageText}>{percentage}%</Text>
        </View>
      </View>
      
      <View style={styles.textContainer}>
        <View style={styles.labelIconContainer}>
          <Text style={styles.label} numberOfLines={1} ellipsizeMode='tail'>
            {label}
          </Text>
          {/* On affiche l'icône seulement si c'est un favori */}
          {isFavorite && (
            <FontAwesomeIcon 
              icon={faBookmark} 
              size={16} 
              color="#4379de" 
              style={{ marginLeft: 8 }} 
            />
          )}
        </View>

        <View style={styles.infoRow}>
          <FontAwesomeIcon icon={faUserGroup} size={14} color="grey" style={{ marginRight: 5 }} />
          <Text style={styles.infoText}>
            {nbeaters != null ? `${nbeaters} personnes` : "/"}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <FontAwesomeIcon icon={faClock} size={14} color="grey" style={{ marginRight: 5 }} />
          <Text style={styles.infoText}>
            {timetomake != null ? `${timetomake}m` : "/"}
          </Text>
        </View>
        
      </View>
    </View>
  );
};

export default RecipeItem;