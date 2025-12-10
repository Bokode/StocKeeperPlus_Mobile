import { faCalendarCheck, faCalendarMinus, faCalendarXmark, faExclamationTriangle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Image, StyleSheet, Text, View } from "react-native";

const FoodItem = ({ label, diet, nutriScore, quantity, storageType, expirationDate }) => {
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
          <Text style={styles.label}>{label}</Text>
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

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  img: {
    width: 115,
    height: 115,
    borderRadius: 8,
    marginRight: 15
  },
  textContainer: {
    flex: 1
  },
  labelIconContainer: {
    flexDirection: 'row', 
    alignItems: "center", 
    justifyContent: "space-between",
    paddingRight: 15,
  },
  label: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 4,
  },
  infoText: {
    color: "grey",
  },
  quantityBadge: {
    position: 'absolute',
    left: '33.4%',
    top: '20%',
    transform: [{ translateX: -16 }, { translateY: -10 }],
    width: 32,
    height: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'white',
    zIndex: 10
  },

  quantityText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  }
});

export default FoodItem;
