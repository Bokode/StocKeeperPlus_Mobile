import { TouchableOpacity, View, Image } from 'react-native';
import styles from "./topBar.styles"
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { useState } from 'react';

import Parameters from './parameters/parameters';

export default function TopBar() {

  const [showParameters, setShowParameters] = useState(false);

  return (
    <>
    <View style={styles.containerTopBar}>
      <Image 
        style={styles.logo} 
        source={require("../../../assets/logo/BigLogo.png")} 
      />
      <TouchableOpacity 
        style={styles.icon}
        onPress={() => setShowParameters(true)}
      >
        <FontAwesomeIcon icon={faGear} size={26} color="white" />
      </TouchableOpacity>
    </View>
    <Parameters 
          isVisible={showParameters} 
          onClose={() => setShowParameters(false)} 
      />
    </>
  );
};