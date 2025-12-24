import { Text, View } from "react-native";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faUserGroup, faClock, faUtensils, faBookmark } from '@fortawesome/free-solid-svg-icons';
import Svg, { Circle } from 'react-native-svg';
import styles from './recipeItem.style';

const RecipeItem = ({ label, nbeaters, timetomake, percentage, isFavorite }) => {
  const size = 80;
  const strokeWidth = 8;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  const progressColor = percentage >= 75 ? "#76cc77" : (percentage >= 40 ? "#f3ce60" : "#bb413b");

  return (
    <View style={styles.card}>
      <View style={styles.widgetContainer}>
        <View style={{ transform: [{ rotate: "-90deg" }] }}>
            <Svg width={size} height={size}>
                <Circle stroke="#e6e6e6" fill="none" cx={size/2} cy={size/2} r={radius} strokeWidth={strokeWidth} />
                <Circle
                    stroke={progressColor}
                    fill="none"
                    cx={size/2} cy={size/2} r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference} ${circumference}`}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                />
            </Svg>
        </View>
        <View style={styles.widgetContent}>
            <FontAwesomeIcon icon={faUtensils} size={18} color="#1c1b1f" />
            <Text style={styles.percentageText}>{percentage}%</Text>
        </View>
      </View>
      
      <View style={styles.textContainer}>
        <View style={styles.labelIconContainer}>
          <Text style={styles.label} numberOfLines={1}>{label}</Text>
          {isFavorite && <FontAwesomeIcon icon={faBookmark} size={18} color="#4379de" style={{ marginLeft: 8 }} />}
        </View>
        <View style={styles.infoRow}>
          <FontAwesomeIcon icon={faUserGroup} size={14} color="grey" style={{ marginRight: 8 }} />
          <Text style={styles.infoText}>{nbeaters ? `${nbeaters} pers.` : "/"}</Text>
        </View>
        <View style={styles.infoRow}>
          <FontAwesomeIcon icon={faClock} size={14} color="grey" style={{ marginRight: 8 }} />
          <Text style={styles.infoText}>{timetomake ? `${timetomake} min` : "/"}</Text>
        </View>
      </View>
    </View>
  );
};

export default RecipeItem;