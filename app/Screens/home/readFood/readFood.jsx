import { faAngleLeft, faBoxArchive, faCalendar, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState } from 'react';
import { Image, ImageBackground, Text, TouchableOpacity, View, Modal } from 'react-native';
import AddOrUpdateFood from '../AddUpdateFood/addOrUpdateFood';
import styles from "./readFood.styles"
import { BASE_URL } from '../../../config/config';

export default function ReadFood({ onClose, data, updateFoodFromDB, addFoodFromDB, onRefresh }) {
  const image = { uri: BASE_URL.slice(0, -3) + data.imagepath };
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAddOrUpdateFood, setShowAddOrUpdateFood] = useState(false);
  let nutriScoreImage;
  let measuringunit;

  switch (data.nutriscoreFood) {
    case "A":
      nutriScoreImage = require("../../../../assets/nutriscore/nutriscore_a.png");
      break;
    case "B":
      nutriScoreImage = require("../../../../assets/nutriscore/nutriscore_b.png");
      break;
    case "C":
      nutriScoreImage = require("../../../../assets/nutriscore/nutriscore_c.png");
      break;
    case "D":
      nutriScoreImage = require("../../../../assets/nutriscore/nutriscore_d.png");
      break;
    case "E":
      nutriScoreImage = require("../../../../assets/nutriscore/nutriscore_e.png");
      break;
    default:
      nutriScoreImage = require("../../../../assets/nutriscore/nutriscore_unknown.png");
  }

  switch (data.measuringunit) {
    case "unit":
      measuringunit = "Unité";
      break;
    case "gram":
      measuringunit = "Gramme";
      break;
    case "centiliter":
      measuringunit = "Centilitre";
      break;
    default: 
      measuringunit = "Quantité";
  }

  function deleteFoodFromDB() {
    fetch(`${BASE_URL}/foodUser/me`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({food: data.idFood, user_mail: data.userMail})
    })
    .then(() => {
      onRefresh();
      onClose();
    })
    .catch(error => {
      console.error(error);
    });
  }

  return (
    <>
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.backgroundImage}>
        <View style={styles.topContainer}>
          <View style={styles.line}>
            <TouchableOpacity onPress={() => onClose()} style={styles.button}>
              <FontAwesomeIcon icon={faAngleLeft} size={24} color="black" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setShowDeleteModal(true)} style={styles.button}>
              <FontAwesomeIcon icon={faTrashCan} size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={[styles.line, styles.updateLine]}>
            <TouchableOpacity onPress={() => setShowAddOrUpdateFood(true)} style={styles.button}>
              <FontAwesomeIcon icon={faPenToSquare} size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.containerContent}>
        <Text style={styles.title}>
          {data.labelFood}
        </Text>
        <Text style={styles.description}>
          Et quoniam inedia gravi adflictabantur, locum petivere Paleas nomine, vergentem in mare, valido muro firmatum, ubi conduntur nunc usque commeatus distribui militibus omne latus Isauriae defendentibus adsueti. circumstetere igitur hoc munimentum per triduum et trinoctium et cum neque adclivitas ipsa sine discrimine adiri letali.
        </Text>  
        <Text style={styles.miniTitle}>
          {data.quantity} {measuringunit}{data.quantity > 1 ? "s" : ""}
        </Text>
        <View style={styles.rowMiniTitle}>
          <FontAwesomeIcon icon={faBoxArchive} size={14} color="black" style={{marginRight: 6}}/>
          <Text style={styles.miniTitle}>
            Stockage
          </Text>
        </View>
        <Text style={styles.textData}>
          {data.storagetype}
        </Text>
        <View style={styles.rowMiniTitle}>
          <FontAwesomeIcon icon={faCalendar} size={14} color="black" style={{marginRight: 6}}/>
          <Text style={styles.miniTitle}>
            Date d&apos;expiration
          </Text>
        </View>
        <Text style={styles.textData}>
          {data.expirationdate}
        </Text>
        <Image source={nutriScoreImage} style={styles.nutriScoreImage}/>
      </View>
      
    </View>
    {showDeleteModal && (
      <Modal
        animationType="slide"        
        presentationStyle="pageSheet" 
        onRequestClose={() => setShowDeleteModal(false)} 
        backdropColor={"transparent"}
      >
        <View style={styles.modalDelete}>
          <Text style={styles.textModal}>Êtes-vous sûr de vouloir supprimer cet aliment ?</Text>
          <TouchableOpacity
            style={styles.buttonModalYes}
            onPress={() => {
              deleteFoodFromDB();
              setShowDeleteModal(false);
            }}
          >
            <Text style={styles.buttonTextYes}>Oui</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonModalNo}
            onPress={() => setShowDeleteModal(false)}
          >
            <Text style={styles.buttonTextNo}>Non</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )}
    {showAddOrUpdateFood && (
      <Modal    
        animationType="slide"        
        presentationStyle="pageSheet" 
        onRequestClose={() => setShowAddOrUpdateFood(false)} 
      >
        <AddOrUpdateFood 
          onClose={() => setShowAddOrUpdateFood(false)} 
          isAnAdd={false} 
          updateFoodFromDB={updateFoodFromDB} 
          addFoodFromDB={addFoodFromDB} 
          data={data} 
          onCloseRead={onClose}/>
      </Modal>
    )}
    </>
    )
};