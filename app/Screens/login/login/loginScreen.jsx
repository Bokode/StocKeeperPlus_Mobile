import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { BASE_URL } from "../../../config/config";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styles from "./loginScreen.styles";
import { faKey, faUser } from "@fortawesome/free-solid-svg-icons";

export default function LoginScreen({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const login = async () => {
    setError(null);

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.message || "Erreur de connexion");
        return;
      }

      onLoginSuccess(email);

    } catch (err) {
      setError("Erreur serveur");
    }
  };

  return (
    <View style={styles.containerScreen}>
      <Image 
        style={styles.logo} 
        source={require("../../../../assets/logo/BigLogo.png")} 
      />
      <View style={styles.containerUser}>
        <View style={styles.section}>
          <Text style={styles.title}>Login</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.inputContainer}>
            <FontAwesomeIcon icon={faUser} size={22} color="black" style={{marginRight: 6}}/>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#B0B0B0"
              value={email}
              onChangeText={setEmail}
            />
          </View>
        </View>
        
        <View style={styles.section}>
          <View style={styles.inputContainer}>
            <FontAwesomeIcon icon={faKey} size={22} color="black" style={{marginRight: 6}}/>
            <TextInput
              style={styles.input}
              placeholder="Mot de passe"
              placeholderTextColor="#B0B0B0"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
        </View>
        
        <View style={styles.section}>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>
        
        <View style={styles.section}>
          <TouchableOpacity style={styles.button} onPress={login}>
            <Text style={styles.buttonText}>Se connecter</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity  onPress={() => console.log("Changement de screen")}>
            <Text style={styles.link}>Créer un compte</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
