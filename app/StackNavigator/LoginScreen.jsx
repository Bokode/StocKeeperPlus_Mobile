import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { BASE_URL } from "../config/config"

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
    <View style={{ flex: 1, justifyContent: "center", padding: 20 }}>
      <Text>Email</Text>
      <TextInput value={email} onChangeText={setEmail} />

      <Text>Mot de passe</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry />

      {error && <Text style={{ color: "red" }}>{error}</Text>}

      <TouchableOpacity onPress={login}>
        <Text>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}
