import { faAngleLeft, faBoxArchive, faCalendar, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ReadFood = ({ onClose, data }) => {
  const image = {uri: 'https://legacy.reactjs.org/logo-og.png'};
  let nutriScoreImage;

switch (data.nutriScore) {
  case "A":
    nutriScoreImage = require("../../../assets/nutriscore/nutriscore_a.png");
    break;
  case "B":
    nutriScoreImage = require("../../../assets/nutriscore/nutriscore_b.png");
    break;
  case "C":
    nutriScoreImage = require("../../../assets/nutriscore/nutriscore_c.png");
    break;
  case "D":
    nutriScoreImage = require("../../../assets/nutriscore/nutriscore_d.png");
    break;
  case "E":
    nutriScoreImage = require("../../../assets/nutriscore/nutriscore_e.png");
    break;
  default:
    nutriScoreImage = require("../../../assets/nutriscore/nutriscore_unknown.png");
}


  return (
    <View style={styles.container}>
        <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
          <View style={styles.topContainer}>
          <View style={styles.line}>
            <TouchableOpacity onPress={() => onClose()} style={styles.button}>
              <FontAwesomeIcon icon={faAngleLeft} size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log("Delete")} style={styles.button}>
              <FontAwesomeIcon icon={faTrashCan} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={[styles.line, styles.updateLine]}>
            <TouchableOpacity onPress={() => console.log("Update")} style={styles.button}>
              <FontAwesomeIcon icon={faPenToSquare} size={24} color="black" />
            </TouchableOpacity>
        </View>
        
      </View>
      </ImageBackground>
      <View style={styles.containerContent}>
        <Text style={styles.title}>
          {data.label}
        </Text>
        <Text style={styles.description}>
          Et quoniam inedia gravi adflictabantur, locum petivere Paleas nomine, vergentem in mare, valido muro firmatum, ubi conduntur nunc usque commeatus distribui militibus omne latus Isauriae defendentibus adsueti. circumstetere igitur hoc munimentum per triduum et trinoctium et cum neque adclivitas ipsa sine discrimine adiri letali.
        </Text>  
        <Text style={styles.miniTitle}>
          {data.quantity} Quantité
        </Text>
        <View style={styles.rowMiniTitle}>
          <FontAwesomeIcon icon={faBoxArchive} size={14} color="black" style={{marginRight: 6}}/>
          <Text style={styles.miniTitle}>
            Stockage
          </Text>
        </View>
        <Text style={styles.textData}>
          {data.storageType}
        </Text>
        <View style={styles.rowMiniTitle}>
          <FontAwesomeIcon icon={faCalendar} size={14} color="black" style={{marginRight: 6}}/>
          <Text style={styles.miniTitle}>
            Date d&apos;expiration
          </Text>
        </View>
        <Text style={styles.textData}>
          {data.expirationDate}
        </Text>
        <Image source={nutriScoreImage} style={styles.nutriScoreImage}/>
      </View>
    </View>
  );
};

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
  }
});

export default ReadFood;