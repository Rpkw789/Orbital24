import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="NotesMarket"
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
      <Tabs.Screen
        name="editprofile"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="TutorMarket"
        options={{
          href: null,
          headerTitle: "Home Page",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
