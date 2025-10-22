import { Slot } from "expo-router";
import { ClerkProvider } from "@clerk/clerk-expo";
import { tokenCache } from "@clerk/clerk-expo/token-cache";
import SafeScreen from "@/components/SafeScreen";
import BiometricProvider from "@/components/BiometricsProvider";
import BiometricProtectedLayout from "@/components/BiometricProtectedLayout";

export default function RootLayout() {
  return (
    <ClerkProvider tokenCache={tokenCache}>
      <BiometricProvider>
        <SafeScreen>
          <BiometricProtectedLayout />
        </SafeScreen>
      </BiometricProvider>
    </ClerkProvider>
  );
}
