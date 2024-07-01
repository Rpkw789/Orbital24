import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="NotesMarket"
        options={{
          headerTitle: "Home Page",
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          title: "Profile",
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
