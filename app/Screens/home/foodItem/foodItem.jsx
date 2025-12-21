import { faCalendarCheck, faCalendarMinus, faCalendarXmark, faExclamationTriangle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Image, Text, View } from "react-native";
import styles from "./foodItem.styles"

export default function FoodItem({ label, diet, nutriScore, quantity, storageType, expirationDate }) {
  const today = new Date();
  const expDate = new Date(expirationDate);
  const dayBeforeExpiration = Math.ceil((expDate - today) / (1000 * 60 * 60 * 24));

  let color, textExpiration, smallIcon, bigIcon;
  if (dayBeforeExpiration > 4) {
    color = "#76cc77";
    textExpiration = dayBeforeExpiration + " jours";
    smallIcon = faCalendarCheck;
    bigIcon = faCalendarCheck;
  } else if (dayBeforeExpiration > 0) {
    color = "#f3ce60";
    textExpiration = dayBeforeExpiration + " jours";
    smallIcon = faExclamationTriangle;
    bigIcon = faCalendarMinus;
  } else if (dayBeforeExpiration === 0) {
    color = "#f3ce60";
    textExpiration = "Expire aujourd'hui";
    smallIcon = faExclamationTriangle;
    bigIcon = faCalendarMinus;
  } else {
    color = "#bb413b";
    textExpiration = "Périmé";
    smallIcon = faTimesCircle;
    bigIcon = faCalendarXmark;
  }

  return (
    <View style={styles.card}>
      <Image 
        style={styles.img} 
        source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }} 
      />
      <View style={styles.textContainer}>
        <View style={styles.labelIconContainer}>
          <Text style={styles.label} numberOfLines={1} ellipsizeMode='tail'>{label}</Text>
          <FontAwesomeIcon icon={bigIcon} size={25} color={color}/>
        </View>
        <Text style={styles.infoText}>{storageType}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <FontAwesomeIcon icon={smallIcon} size={14} color={"grey"} style={{ marginRight: 5 }} />
          <Text style={styles.infoText}>{textExpiration}</Text>
        </View>
      </View>
      <View style={[styles.quantityBadge, { backgroundColor: color }]}>
        <Text style={styles.quantityText}>{quantity}</Text>
      </View>
    </View>
  );
};