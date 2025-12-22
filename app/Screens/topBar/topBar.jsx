import { TouchableOpacity, View, Image } from 'react-native';
import styles from "./topBar.styles"
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';

export default function TopBar() {
  return (
    <View style={styles.containerTopBar}>
      <Image 
        style={styles.logo} 
        source={require("../../../assets/logo/BigLogo.png")} 
      />
      <View style={styles.containerIcon}>
          <TouchableOpacity 
            style={styles.icon}
            onPress={() => console.log("Notifications")}
        >
            <FontAwesomeIcon icon={faBell} size={26} color="white" />
        </TouchableOpacity>
        <TouchableOpacity 
            style={styles.icon}
            onPress={() => console.log("Paramètres")}
        >
            <FontAwesomeIcon icon={faGear} size={26} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};