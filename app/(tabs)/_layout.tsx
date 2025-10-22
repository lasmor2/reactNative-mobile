import { Stack, Redirect, Tabs } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/colors";

const TabLayout = () => {
  const { isSignedIn } = useAuth();
  if (!isSignedIn) {
    return <Redirect href={"/(auth)/sign-in" as any} />;
  }
  return (
    <Tabs 
    screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: COLORS.primary,
      tabBarInactiveTintColor: COLORS.textLight,
      tabBarStyle:{
        backgroundColor: COLORS.white,
        borderTopColor: COLORS.border,
        borderTopWidth: 1,
        paddingTop: 8,
        paddingBottom: 8,
        height: 80
      },
      tabBarLabelStyle:{
        fontSize: 12,
        color: COLORS.textLight,
        fontFamily: "NotoSans",
        textTransform: "capitalize",
        fontWeight: "600",
        marginBottom: 4
      }
    }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Recipes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="restaurant" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: "Search",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "favorites",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
