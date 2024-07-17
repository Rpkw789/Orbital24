import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="homepage"
        options={{
          headerTitle: "Home Page",
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
