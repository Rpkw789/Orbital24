import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs>
      <Tabs.Screen
        name="home"
        options={{
          headerTitle: "Home Page",
          title: "Home",
        }}
      />
      <Tabs.Screen
        name="upload"
        options={{
          headerTitle: "+",
          title: "+",
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerTitle: "Profile",
          title: "Profile",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
