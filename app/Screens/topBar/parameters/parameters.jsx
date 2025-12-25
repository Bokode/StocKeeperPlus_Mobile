import { 
    Text, 
    TouchableOpacity, 
    View, 
    Modal, 
    TouchableWithoutFeedback,
    Alert,
    ScrollView,
    Linking
} from "react-native";
import styles from "./parameters.styles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { 
    faUser, 
    faBell, 
    faTimes, 
    faRightFromBracket, 
    faChevronLeft 
} from "@fortawesome/free-solid-svg-icons"; 
import { useState } from "react";
import UserInfo from "./userInfo"; 
import { getMessaging, hasPermission} from '@react-native-firebase/messaging';

export default function Parameters({ isVisible, onClose }) {

    const [showUserInfo, setShowUserInfo] = useState(false);
    const handleClose = () => {
        setShowUserInfo(false); 
        onClose(); 
    };


const handleNotificationPress = async () => {
    try {
        const messaging = getMessaging();
        
        const authStatus = await hasPermission(messaging);
    


        if (authStatus === 1 ) {
            Alert.alert("Info", "Les notifications sont activées !");
            return;
        }

        console.log("Demande de permission en cours...");
        const newStatus = await messaging().requestPermission();

        if (newStatus === 1 || newStatus === 2) {
             Alert.alert("Succès", "Notifications activées !");
        } else {
             throw new Error("Refus utilisateur");
        }

    } catch (error) {
        console.log("Échec ou refus :", error);
        Alert.alert(
            "Notifications désactivées",
            "L'autorisation est bloquée dans les réglages. Veuillez l'activer manuellement.",
            [
                { text: "Annuler", style: "cancel" },
                { text: "Réglages", onPress: () => Linking.openSettings() }
            ]
        );
    }
};


    if (!isVisible) return null;

    return (
        <>
            <Modal
                transparent={true}
                visible={isVisible}
                animationType="fade"
                onRequestClose={handleClose} 
            >
                <View style={styles.modalOverlay}>
                    
                    <TouchableWithoutFeedback onPress={handleClose}>
                        <View style={styles.overlayBackground} />
                    </TouchableWithoutFeedback>

                    <View style={styles.containerParams}>
                        <View style={styles.header}>
                            <Text style={styles.title}>Paramètres</Text>
                            <TouchableOpacity onPress={handleClose}>
                                    <FontAwesomeIcon icon={faTimes} size={24} color="#4379de"/>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.content}>
                            <TouchableOpacity 
                                style={styles.menuItem} 
                                onPress={() => setShowUserInfo(true)}
                            >
                                <Text style={styles.menuText}>Mon profil</Text>
                                <FontAwesomeIcon icon={faUser} size={20} color="#4379de"/>
                            </TouchableOpacity>
                            
                         <TouchableOpacity style={styles.menuItem} onPress={handleNotificationPress}>
                                <Text style={styles.menuText}>Notifications</Text>
                                <FontAwesomeIcon icon={faBell} size={20} color="#4379de"/>
                         </TouchableOpacity>

                       
                            <TouchableOpacity style={styles.menuItem}>
                                <Text style={styles.menuText}>Déconnexion</Text>
                                <FontAwesomeIcon icon={faRightFromBracket} size={20} color="#4379de" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>


            <Modal
                visible={showUserInfo}
                animationType="slide"
                presentationStyle="pageSheet" 
                onRequestClose={() => setShowUserInfo(false)}
            >
                
                    <View style={styles.fullScreenContainer}>
                        
                        <View style={styles.fullScreenHeader}>
                            <TouchableOpacity 
                                onPress={() => setShowUserInfo(false)} 
                                style={styles.backButton}
                            >
                                <FontAwesomeIcon icon={faChevronLeft} size={20} color="#4379de" />
                                <Text style={styles.backText}></Text>
                            </TouchableOpacity>
                            <Text style={styles.fullScreenTitle}>Mon Profil</Text>
                            
                            
                        </View>
                        <ScrollView contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}>
                            <UserInfo />
                        </ScrollView>

                    </View>
             
            </Modal>
        </>
    );
}