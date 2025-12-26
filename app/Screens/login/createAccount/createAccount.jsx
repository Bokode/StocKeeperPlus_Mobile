import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { BASE_URL } from "../../../config/config";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import styles from "./createAccount.styles";
import { faEnvelope, faKey, faUser } from "@fortawesome/free-solid-svg-icons";

export default function CreateAccount({ navigation, onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const createAccount = async () => {
    setError(null);

    if (!username.trim() || !email.trim() || !password || !passwordConfirm) {
      setError("Merci de remplir tous les champs.");
      return;
    }

    if (password.length < 8) {
      setError("Le mot de passe est trop court (Minimum 8 charactères)")
      return;
    }

    if (password.length > 64) {
      setError("Le mot de passe est trop long (Maximum 64 charactères)")
      return;
    }

    if (password !== passwordConfirm) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${BASE_URL}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ mail: email, username, password }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        setError(data.message || "Erreur lors de la création du compte.");
        console.error(data);
        setLoading(false);
        return;
      }

      await login();

    } catch (err) {
      setError("Erreur serveur.");
      setLoading(false);
    }
  };

  const login = async () => {
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
        
        setLoading(false);
        return;
      }

      setLoading(false);
      onLoginSuccess(email);

    } catch (err) {
      setError("Erreur serveur.");
      setLoading(false);
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
          <Text style={styles.title}>Création de compte</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.inputContainer}>
            <FontAwesomeIcon icon={faUser} size={22} color="black" style={{marginRight: 6}}/>
            <TextInput
              style={styles.input}
              placeholder="Nom d'utilisateur"
              placeholderTextColor="#B0B0B0"
              value={username}
              onChangeText={setUsername}
              editable={!loading}
              autoCapitalize="none"
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.inputContainer}>
            <FontAwesomeIcon icon={faEnvelope} size={22} color="black" style={{marginRight: 6}}/>
            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#B0B0B0"
              value={email}
              onChangeText={setEmail}
              editable={!loading}
              keyboardType="email-address"
              autoCapitalize="none"
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
              autoCapitalize="none"
              editable={!loading}
            />
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.inputContainer}>
            <FontAwesomeIcon icon={faKey} size={22} color="black" style={{marginRight: 6}}/>
            <TextInput
              style={styles.input}
              placeholder="Répéter le mot de passe"
              placeholderTextColor="#B0B0B0"
              value={passwordConfirm}
              onChangeText={setPasswordConfirm}
              secureTextEntry
              autoCapitalize="none"
              editable={!loading}
            />
          </View>
        </View>

        <View style={styles.section}>
          {error && <Text style={styles.error}>{error}</Text>}
        </View>

        <View style={styles.section}>
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={createAccount}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? "Chargement..." : "Créer compte"}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <TouchableOpacity onPress={() => navigation.goBack()} disabled={loading}>
            <Text style={styles.link}>Déjà un compte ? Se connecter</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}