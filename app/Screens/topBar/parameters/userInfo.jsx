import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  Alert
} from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faSave, faPen, faTimes } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../../../config/config';
import styles from './userInfo.styles';

export default function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });

  // 1. Récupération des infos
  const getUserInfo = () => {
    fetch(`${BASE_URL}/user/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => res.json())
    .then(data => {
      setUserInfo(data);
      setEditForm({ 
        username: data.username, 
        password: '', 
        confirmPassword: '' 
      });

    })
    .catch(error => {
      console.error(error);
      Alert.alert("Erreur", "Impossible de récupérer les informations.");
    });
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const handleUpdate = () => {
    if (!editForm.username || !editForm.password || !editForm.confirmPassword) {
      Alert.alert("Attention", "Tous les champs sont obligatoires (Nom et mot de passe).");
      return;
    }

    if (editForm.password !== editForm.confirmPassword) {
      Alert.alert("Erreur", "Les mots de passe ne correspondent pas.");
      return;
    }

    const body = {
      username: editForm.username,
      password: editForm.password
    };

    fetch(`${BASE_URL}/user/me`, {
      method: 'PATCH', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    })
    .then(async res => {
      if (res.ok) {
        setUserInfo({ ...userInfo, username: editForm.username });
        setIsEditing(false);
        setEditForm(prev => ({ ...prev, password: '', confirmPassword: '' })); 
        Alert.alert("Succès", "Votre profil a été mis à jour !");
      } else {
        const errorData = await res.json();
        Alert.alert("Erreur", errorData.message || "Erreur lors de la mise à jour");
      }
    })
    .catch(error => {
      console.error(error);
      Alert.alert("Erreur réseau", "Impossible de contacter le serveur.");
    });
  };

  return (
    <View style={styles.container}>
        {userInfo && (
        <View style={styles.card}>
          
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email :</Text>
            <Text style={styles.value}>{userInfo.mail}</Text>
          </View>

          <View style={styles.separator} />

          {isEditing ? (
            <View style={styles.editContainer}>
              
              <Text style={styles.label}>Nom d'utilisateur :</Text>
              <TextInput
                style={styles.input}
                value={editForm.username}
                onChangeText={(text) => setEditForm({ ...editForm, username: text })}
              />

              <Text style={styles.label}>Nouveau mot de passe :</Text>
              <TextInput
                style={styles.input}
                value={editForm.password}
                onChangeText={(text) => setEditForm({ ...editForm, password: text })}
                secureTextEntry={true}
                placeholder="Minimum 8 caractères"
              />

              <Text style={styles.label}>Confirmer le mot de passe :</Text>
              <TextInput
                style={styles.input}
                value={editForm.confirmPassword}
                onChangeText={(text) => setEditForm({ ...editForm, confirmPassword: text })}
                secureTextEntry={true}
                placeholder="Répétez le mot de passe"
              />

              <View style={styles.buttonGroup}>
                <TouchableOpacity 
                  style={[styles.btn, styles.btnCancel]} 
                  onPress={() => setIsEditing(false)}
                >
                  <FontAwesomeIcon icon={faTimes} color="white" />
                  <Text style={styles.btnText}> Annuler</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={[styles.btn, styles.btnSave]} 
                  onPress={handleUpdate}
                >
                  <FontAwesomeIcon icon={faSave} color="white" />
                  <Text style={styles.btnText}> Enregistrer</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            // --- MODE LECTURE ---
            <View>
              <View style={styles.infoRow}>
                <Text style={styles.label}>Nom d'utilisateur :</Text>
                <Text style={styles.value}>{userInfo.username}</Text>
              </View>

              <TouchableOpacity 
                style={styles.modifyBtn} 
                onPress={() => setIsEditing(true)}
              >
                <FontAwesomeIcon icon={faPen} color="white" />
                <Text style={styles.btnText}> Modifier mon profil</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}
    </View>
  );
}

