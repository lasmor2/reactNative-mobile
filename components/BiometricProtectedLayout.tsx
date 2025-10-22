import { Slot } from "expo-router";
import { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { useBiometrics } from "./BiometricsProvider";

export default function BiometricProtectedLayout() {
  const { isUnlocked, authenticate } = useBiometrics();
  const [biometricType, setBiometricType] = useState("Biometric");

  useEffect(() => {
    const detectType = async () => {
      const types =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
        setBiometricType("Fingerprint");
      } else if (
        types.includes(
          LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION
        )
      ) {
        setBiometricType("Face Unlock");
      }
    };

    detectType();

    if (!isUnlocked) {
      authenticate();
    }
  }, []);

  if (!isUnlocked) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
        }}
      >
        <Text style={{ fontSize: 20, marginBottom: 20, color: "white" }}>
          Use {biometricType} to Unlock
        </Text>

        <TouchableOpacity onPress={authenticate}>
          <FontAwesome5
            name={biometricType === "Fingerprint" ? "fingerprint" : "smile"}
            size={80}
            color="black"
          />
        </TouchableOpacity>
      </View>
    );
  }

  return <Slot />;
}
