import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "@/context/userContext";

const TabsLayout = () => {
  const { user } = useContext(AppContext);
  const [isStudent, setIsStudent] = useState(true);

  useEffect(() => {
    setIsStudent(user.role === 'student');
  }, [user]);

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
      {isStudent ? (
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
      ) : (
        <Tabs.Screen
          name="tutorprofile"
          options={{
            headerTitle: "Profile",
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
          }}
        />
      )}
      {isStudent ? (
        <Tabs.Screen
          name="tutorprofile"
          options={{
            headerTitle: "Profile",
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
            href: null,
          }}
        />
      ) : (
        <Tabs.Screen
          name="profile"
          options={{
            headerTitle: "Profile",
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="person" color={color} size={size} />
            ),
            href: null,
          }}
        />
      )}
      {!isStudent ? (
        <Tabs.Screen
          name="upload"
          options={{
            headerTitle: "Upload",
            title: "Upload",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cloud-upload-sharp" color={color} size={size} />
            ),
          }}
        />
      ) : (
        <Tabs.Screen
          name="upload"
          options={{
            headerTitle: "Upload",
            title: "Upload",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="cloud-upload-sharp" color={color} size={size} />
            ),
            href: null,
          }}
        />
      )}
    </Tabs>
  );
};

export default TabsLayout;

