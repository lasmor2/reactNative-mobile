import { PropsWithChildren, createContext, useContext, useState } from "react";
import * as LocalAuthentication from "expo-local-authentication";
import { Alert } from "react-native";

type BiometricsContextType = {
  isUnlocked: boolean;
  authenticate: () => Promise<void>;
};

const BiometricsContext = createContext<BiometricsContextType>({
  isUnlocked: false,
  authenticate: async () => {},
});

export default function BiometricsProvider({ children }: PropsWithChildren) {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const authenticate = async () => {
    try {
      const hasHardware = await LocalAuthentication.hasHardwareAsync();
      if (!hasHardware) {
        Alert.alert("Unsupported", "Biometric authentication not available.");
        return;
      }

      const supportedTypes =
        await LocalAuthentication.supportedAuthenticationTypesAsync();
      if (!supportedTypes.length) {
        Alert.alert(
          "Unavailable",
          "No biometric authentication methods found."
        );
        return;
      }

      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Authenticate to unlock",
        fallbackLabel: "Enter Passcode",
      });

      if (result.success) {
        setIsUnlocked(true);
      } else {
        Alert.alert("Failed", "Authentication unsuccessful.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <BiometricsContext.Provider value={{ isUnlocked, authenticate }}>
      {children}
    </BiometricsContext.Provider>
  );
}

export const useBiometrics = () => useContext(BiometricsContext);
